# Portal de Estágios — modelo para campi do IFMS

Modelo reutilizável do portal público e do painel administrativo de acompanhamento de estágios desenvolvido pela COERI do IFMS Campus Três Lagoas.

O repositório contém:

- portal público de orientações;
- solicitação de TCE com protocolo público;
- consulta do andamento do TCE;
- painel administrativo protegido pelo Supabase Auth;
- acompanhamento de relatórios parcial e final;
- envio privado de relatórios em PDF;
- cadastro de professores orientadores;
- importação de estágios, estudantes e convênios por CSV;
- integração com Supabase e Cloudflare Turnstile.

## Importante

Este modelo não contém banco de dados, usuários, documentos, domínio, chaves ou CAPTCHA do Campus Três Lagoas. Cada campus deve criar e administrar sua própria infraestrutura.

Não publique o portal enquanto `supabaseUrl`, `supabaseAnonKey` e `turnstileSiteKey` estiverem vazios.

## 1. Criar o repositório do campus

Use o botão **Use this template** no GitHub e crie um repositório na conta institucional do campus.

## 2. Configurar a identidade

Edite somente `assets/campus-config.js` para informar:

- nome e cidade do campus;
- siglas aceitas nos relatórios CSV;
- e-mail e telefone da COERI;
- endereço público do portal;
- logotipo;
- URL e chave pública do Supabase;
- chave pública do Cloudflare Turnstile;
- links do painel e do consumo do Supabase.

Substitua `assets/logo-campus.svg` pela marca oficial do campus ou altere `logoUrl`.

Revise também os conteúdos institucionais dos arquivos HTML: cursos, cargas horárias, documentos, formulários, professores e procedimentos podem variar entre os campi.

## 3. Criar o Supabase

Crie um projeto Supabase exclusivo para o campus. Depois:

1. Execute `supabase/setup.sql` no SQL Editor.
2. Execute, em ordem cronológica, os arquivos de `supabase/migrations`.
3. Em **Authentication > Users**, crie o usuário administrativo da COERI.
4. Cadastre o usuário na tabela `admin_users`, conforme a instrução ao final de `supabase/setup.sql`.
5. Confirme que o bucket privado e as políticas de acesso aos relatórios foram criados.

Nunca coloque a chave `service_role` em arquivos do site ou no GitHub. A chave `anon/publishable` é pública e deve ser protegida pelas políticas RLS incluídas no banco.

## 4. Configurar o Cloudflare Turnstile

Crie um widget para os domínios do campus. Coloque a chave pública em `assets/campus-config.js`.

No Supabase, configure os segredos das funções:

```text
TURNSTILE_SECRET_KEY=chave-secreta-do-turnstile
ALLOWED_ORIGINS=https://dominio-do-campus,https://usuario.github.io
COERI_EMAIL=coeri.campus@ifms.edu.br
CAMPUS_NAME=IFMS Campus Nome do Campus
```

Não coloque esses valores secretos no repositório.

## 5. Publicar as funções

Com o Supabase CLI vinculado ao projeto do campus, publique:

```text
supabase functions deploy submit-tce
supabase functions deploy check-tce-status
supabase functions deploy submit-internship-reports
```

## 6. Publicar no GitHub Pages

Em **Settings > Pages**, selecione a branch principal e a pasta raiz. Para domínio próprio, crie um arquivo `CNAME` contendo somente o domínio e configure o DNS institucional.

Adicione todos os domínios utilizados ao widget Turnstile e à variável `ALLOWED_ORIGINS`.

## 7. Testes obrigatórios antes da produção

- login e recuperação de senha do administrador;
- envio de uma solicitação de TCE;
- geração e consulta do protocolo;
- mudança de todos os status públicos;
- envio e exclusão de relatórios;
- importações CSV;
- cadastro e limite de orientadores;
- consulta pública dos convênios;
- funcionamento do CAPTCHA no domínio definitivo;
- visualização em celular e computador;
- confirmação de que nenhum dado aparece para usuários não autenticados.

## Segurança e proteção de dados

Cada campus é responsável por definir perfis de acesso, prazo de retenção, base legal, avisos de privacidade e procedimentos internos. Use contas institucionais, mantenha o Supabase com RLS habilitado e exclua documentos e solicitações completas quando deixarem de ser necessários.

## Origem

Projeto-base desenvolvido pela Coordenação de Extensão e Relações Institucionais do IFMS Campus Três Lagoas.
