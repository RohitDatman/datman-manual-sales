<?php
// Local dashboard: lists every PHP script in this repo, linking directly
// to its own URL — same as MAMP's htdocs listing. Clicking a script
// navigates the browser to it and PHP's built-in server executes it
// directly, so headers/redirects/links in its output work natively.

$root = __DIR__;
$scripts = array_values(array_filter(glob($root . '/*.php'), function ($f) {
    return basename($f) !== 'index.php';
}));
sort($scripts);
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Datman Test Scripts</title>
<style>
  body { font-family: -apple-system, sans-serif; margin: 2rem; background: #f7f7f8; color: #1a1a1a; }
  h1 { font-size: 1.25rem; }
  ul { list-style: none; padding: 0; columns: 3; }
  li { margin-bottom: 0.4rem; break-inside: avoid; }
  a { text-decoration: none; color: #2563eb; }
  a:hover { text-decoration: underline; }
  .meta { color: #666; font-size: 0.85rem; margin-bottom: 1rem; }
</style>
</head>
<body>
<h1>Datman Test Scripts (<?= count($scripts) ?>)</h1>
<div class="meta">Click a script to open it directly — same as browsing to it in MAMP's htdocs.</div>
<ul>
<?php foreach ($scripts as $path): $name = basename($path); ?>
  <li><a href="/<?= rawurlencode($name) ?>" target="_blank"><?= htmlspecialchars($name) ?></a></li>
<?php endforeach; ?>
</ul>
</body>
</html>
