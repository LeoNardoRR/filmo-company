#!/usr/bin/env bash
# Gera uma cópia estática do site em ./pages-out para o GitHub Pages.
# Uso: npm run build && bash scripts/build-pages.sh
# O site fica em https://<usuario>.github.io/<repo>/, por isso os caminhos
# absolutos (/assets/..., /images/...) recebem o prefixo BASE.
set -euo pipefail

BASE="${PAGES_BASE:-/filmo-company}"
PORT=3199
OUT=pages-out

rm -rf "$OUT" && mkdir -p "$OUT"
cp -R dist/client/. "$OUT/"
rm -f "$OUT/_headers"

npx vinext start -p "$PORT" >/tmp/vinext-start.log 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT
for _ in $(seq 1 40); do curl -sf "http://localhost:$PORT/" -o "$OUT/index.html" && break; sleep 0.5; done
test -s "$OUT/index.html"

# Logo: o otimizador de imagens não existe no Pages, usa o arquivo direto.
sed -i -E 's#/_vinext/image\?url=%2Fimages%2Flogo\.png&amp;w=[0-9]+&amp;q=[0-9]+#'"$BASE"'/images/logo.png#g' "$OUT/index.html"
sed -i -E 's# ?'"$BASE"'/images/logo\.png [0-9]+w,?##g' "$OUT/index.html"

# Prefixa cada pasta/arquivo de nível raiz que o build publicou.
for entry in $(ls "$OUT"); do
  [ "$entry" = "index.html" ] && continue
  name="${entry%.*}"; [ -d "$OUT/$entry" ] && name="$entry"
  esc=$(printf '%s' "$entry" | sed 's/[.[\*^$/]/\\&/g')
  sed -i -E 's#(^|[^A-Za-z0-9_.-])/'"$esc"'#\1'"$BASE"'/'"$entry"'#g' "$OUT/index.html"
done

# Helper de modulepreload do Vite monta "/" + arquivo; troca pela base do Pages.
for js in $(grep -l 'modulepreload' "$OUT"/assets/*.js); do
  sed -i -E 's#return`/`\+([a-z])\}#return`'"$BASE"'/`+\1}#g' "$js"
done

# Arquivos públicos citados dentro dos scripts (ex.: favicon animado).
for f in $(cd "$OUT" && ls | grep -E '\.(png|svg|ico|jpg)$'); do
  sed -i -E 's#([`"'\''])/'"$f"'([`"'\''])#\1'"$BASE"'/'"$f"'\2#g' "$OUT"/assets/*.js
done

cp "$OUT/index.html" "$OUT/404.html"
touch "$OUT/.nojekyll"
echo "Pages pronto em ./$OUT ($(du -sh "$OUT" | cut -f1))"
