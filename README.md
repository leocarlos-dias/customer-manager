# Projeto REACT com NODEJS

## Sobre a ENERGY

A Energy é uma plataforma web para gestores que querem gerir sua equipe de funcionario.

## Sobre a aplicação

A Energy como dito é uma plataforma web que compõe uma página para usuários administradores entrarem.

- Login: Composta por tela de login via formulário, aonde o usuário deverá entrar com as credenciais de login e senha respectivamente: *leocarlos-dias* e *123*.
- Home: A página para o gestor, lá ele encontrará um sistema de cadastro de clientes, podendo adicionar, alterar e até excluir clientes.

### Iniciar a aplicação

1. Criar um clone dese repositório.
2. Instalar as depêndencias:
   - Digitar o comando "yarn" dentro da pasta "client" e "server".
3. Iniciar o servidor digitando o comando "yarn dev" dentro da pasta "server" - PORT 3333.
4. Iniciar a cliente digitando o comando "yarn start" dentro da pasta "cliente" - PORT 3000.

### Como funciona

- A página inicial é uma página de login que pode ser autenticada usando o usuário `leocarlos-dias` e senha `123`, também pode se utilizar o recurso de `lembrar`, aonde ao logar utilizando essa opção você não precisarará se autenticar novamente.
- Após o Login, a página tem uma lista de clientes, através da qual o usuário deve pode cadastrar novos clientes, visualizar informações de um cliente específico, atualizar um cliente e deletar clientes. O cadastro possui nome, email, telefone, endereço e cpf.

### Ferramentas e Stack a ser utilizado

- ReactJS
- Tailwind
- NodeJS
- MongoDB
- TypeScript
- HTML e CSS
