# Modelos de conteúdo

Copie o modelo para a pasta do tipo, renomeie com o endereço desejado
(ex.: `entrevistas/maria-silva-doceria.md` → `/entrevistas/maria-silva-doceria`)
e crie uma pasta com o mesmo nome para as fotos.

| Tipo                   | Pasta                       | Modelo                   |
| ---------------------- | --------------------------- | ------------------------ |
| Entrevista             | `src/content/entrevistas/`  | `entrevista.md`          |
| Cobertura de evento    | `src/content/coberturas/`   | `cobertura.md`           |
| Edição do Café Conexão | `src/content/cafe-conexao/` | `edicao-cafe-conexao.md` |
| Marca em destaque      | `src/content/marcas/`       | `marca.md`               |
| Evento da agenda       | `src/content/agenda/`       | `agenda.md`              |

Regras:

- Nome do arquivo em minúsculas, sem acento, palavras separadas por hífen.
- Datas no formato AAAA-MM-DD; horários entre aspas no formato 'HH:MM'.
- Fotos em JPG ou PNG, de preferência com 1600 px de largura; o site gera as versões leves.
- `coverAlt`/`alt`: descreva a foto para quem não pode vê-la (obrigatório).
- `draft: true` esconde o conteúdo do site sem apagar o arquivo.
- Rode `npm run build`: se faltar algum campo, o erro diz qual arquivo e qual campo.
