# Suche nach Hero-Komponenten und -Importen
echo "=== Suche nach Hero-Komponenten ==="
find . -name "*.tsx" -o -name "*.ts" | grep -i hero
echo ""

echo "=== Suche nach Hero-Importen ==="
grep -r "import.*Hero" --include="*.tsx" --include="*.ts" .
echo ""

echo "=== Suche nach Hero-Verwendungen ==="
grep -r "<Hero" --include="*.tsx" --include="*.ts" .
