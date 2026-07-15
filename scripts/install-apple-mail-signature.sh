#!/bin/zsh

set -euo pipefail

SCRIPT_DIR="${0:A:h}"
PROJECT_DIR="${SCRIPT_DIR:h}"
HTML_FILE="$PROJECT_DIR/public/email-signatures/alexander-landman.html"
BACKUP_DIR="/tmp/arch9-mail-signature-backups"

if [[ ! -f "$HTML_FILE" ]]; then
  echo "Signature HTML was not found: $HTML_FILE" >&2
  exit 1
fi

if pgrep -x Mail >/dev/null 2>&1; then
  echo "Apple Mail is running. Quit Mail completely, then run this command again." >&2
  exit 1
fi

mail_roots=(
  "$HOME/Library/Mail"
  "$HOME/Library/Containers/com.apple.mail/Data/Library/Mail"
  "$HOME/Library/Group Containers/group.com.apple.mail"
)

target="$(
  find "${mail_roots[@]}" -type f -name '*.mailsignature' -print0 2>/dev/null \
    | xargs -0 ls -t 2>/dev/null \
    | head -n 1 \
    || true
)"

if [[ -z "$target" || ! -f "$target" ]]; then
  cat >&2 <<'EOF'
No Apple Mail signature file could be found.

First create or select the placeholder signature in Mail, then quit Mail.
If Terminal reports "Operation not permitted", enable:
System Settings > Privacy & Security > Full Disk Access > Terminal
EOF
  exit 1
fi

mkdir -p "$BACKUP_DIR"
stamp="$(date '+%Y%m%d-%H%M%S')"
backup="$BACKUP_DIR/$stamp-${target:t}"
temporary="$(mktemp /tmp/arch9-signature.XXXXXX)"

cp "$target" "$backup"
chflags nouchg "$target" 2>/dev/null || true

perl - "$target" "$HTML_FILE" "$temporary" <<'PERL'
use strict;
use warnings;

my ($signature_file, $html_file, $output_file) = @ARGV;

open my $signature, '<:raw', $signature_file or die "Cannot read $signature_file: $!\n";
local $/;
my $existing = <$signature>;
close $signature;

my ($headers) = split /\r?\n\r?\n/, $existing, 2;
$headers //= '';

if ($headers =~ /^Content-Transfer-Encoding:/mi) {
  $headers =~ s/^Content-Transfer-Encoding:.*$/Content-Transfer-Encoding: 8bit/mi;
} else {
  $headers = "Content-Transfer-Encoding: 8bit\n" . $headers;
}

if ($headers =~ /^Content-Type:/mi) {
  $headers =~ s/^Content-Type:.*$/Content-Type: text\/html; charset=utf-8/mi;
} else {
  $headers = "Content-Type: text/html; charset=utf-8\n" . $headers;
}

open my $html, '<:raw', $html_file or die "Cannot read $html_file: $!\n";
my $body = <$html>;
close $html;

open my $output, '>:raw', $output_file or die "Cannot write $output_file: $!\n";
print {$output} $headers, "\n\n", $body;
close $output;
PERL

cp "$temporary" "$target"
rm -f "$temporary"
chflags uchg "$target"

cat <<EOF
Installed the ARCH9 signature directly into:
$target

Backup saved at:
$backup

Open Mail and create a new message to verify it.
The signature file is locked so Mail cannot rewrite the layout.
EOF
