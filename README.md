# ***Food Explorer - Backend Repository***
### https://foodexplorer-restaurant.netlify.app

![image](https://github.com/Jonathan-Pacheco/foodexplorer_frontend/assets/109677153/2914e54e-8699-49a0-9735-a5cb72292200)

## ***Sobre o Food Explorer***
O projeto Food Explorer é parte de uma aplicação responsiva de um site de restaurante, proporcionando as seguintes experiências:

- **Autenticação do Usuário:** Os usuários têm a possibilidade de realizar `cadastro` e `login` por meio das telas de sign-in e sign-up.
 
- **Exploração de Pratos:** Os usuários têm a liberdade de `pesquisar` e `visualizar` os detalhes dos pratos disponíveis.
 
- **Funcionalidades do Admin:** O administrador tem acesso a recursos adicionais, como `criar`, `editar`, `visualizar` os detalhes e `pesquisar` pratos de forma mais abrangente.

## ***Como começar***
Siga as etapas abaixo para configurar e executar o projeto em sua máquina local:

## ***Clonando o repositório***
Use o seguinte comando no terminal do VSCode para clonar o repositório: 

`git clone git@github.com:Jonathan-Pacheco/foodexplorer_backend.git`

## ***Instalando as dependências***
Para instalar as dependências do projeto, utilize o comando: `npm install`.

Este comando instalará todas as dependências necessárias, incluindo a pasta `node_modules`.

## ***Renomeando o .env***
Renomeie o arquivo .env.example para apenas .env, e nele passe um AUTH_SECRET e um PORT como no exemplo a seguir:

 `AUTH_SECRET=07a99aaf21e37b108f40b3e185509225`
 
 `PORT=3333`

## ***Iniciando o servidor***
Após concluir a instalação, você pode iniciar o servidor com o seguinte comando: `npm run dev`.

# ***Observações***
- Certifique-se de também clonar e executar o [frontend](https://github.com/Jonathan-Pacheco/foodexplorer_frontend) para que a aplicação funcione corretamente.

- Lembre-se de que tanto o frontend quanto o backend precisam estar sendo executados simultaneamente para que a aplicação funcione corretamente.

 #### ***Para utilizar a aplicação como admin:***
 
 - **email**: `admin@foodexplorer.com`
  
 - **senha**: `123456`
