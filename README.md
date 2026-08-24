# Yentas Klabber

Official Brooklyn four-player partnership rules site for **Yentas Klabber**.

- Live site: [yentasklabber.com](https://yentasklabber.com)
- Editable rules source: [`content/yentas-klabber.md`](content/yentas-klabber.md)
- Original PDF (official rules, renamed from the source file's awkward
  `Yentas%20Clabber.pdf.pdf` name so the download link resolves cleanly):
  [`yentas-klabber-rules.pdf`](yentas-klabber-rules.pdf)

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`, then:

```bash
python3 scripts/verify-anchors.py
```
