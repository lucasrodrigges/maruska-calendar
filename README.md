# Maruska Calendar

Aplicação no estilo "todo list" para agendamento de shows para a cantora Maruska.

Backend e Banco de Dados hospedado na <a href='https://railway.app/'>Railway</a> e Frontend na <a href='https://vercel.com/'>Vercel</a>.

Ps: Versão para Desktop em construção

## Tecnologias Utilizadas

### Frontend:

- HTML
- CSS
- React JS
- Context API
- Axios

### Backend

- NodeJS
- Express
- Joi
- Sequelize ORM
- MYSQL
- Arquitetura utilizada: MSC (MODEL, SERVICE e CONTROLLER)

## Funcionalidades

- A aplicação permite que o usuário crie uma conta e visualize todos os shows agendados, contendo informações como endereço, data, hora e campo para observações.

- Na aba de perfil é possível editar o nome e email de usuário, bem como excluir sua conta e realizar o logout.

## Funcionalidades de administrador

Além disso, quando a conta é de administrador, botões extras são mostrados na tela:

- Botão para entrar no evento e poder editar ou excluí-lo.

  <img src='./readme/images/enter-button.jpeg'><img src='./readme/images/inside-event.jpeg'>

- Botão para cadastrar novo evento:

  <img src='./readme/images/new-event.jpeg'>

  - Botão para cadastrar novo músico:

  <img src='./readme/images/new-musician.jpeg'>

Telas de cadastro de novos eventos:

<img src='./readme/images/event-form.jpeg'><img src='./readme/images/add-musician-form.jpeg'><img src='./readme/images/event-review.jpeg'>
