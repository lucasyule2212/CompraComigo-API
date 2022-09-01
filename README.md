# CompraComigo-API

Repositório da API do app Compra Comigo desenvolvido para a cadeira de Projetão.

## Rodando o projeto:

 - Instalação das dependências:
	 - No terminal, utilizar o comando `yarn` ou `npm install`.
 - Após a instalação das dependências:
	 - Configuração dos arquivos de variáveis de ambiente:
		 - Copiar o arquivo `.env.example` , retirar o sufixo `.example` e adicionar as keys do Firebase.
		 - Keys do Firebase podem ser encontradas no painel de controle do firebase em: Configuração do Projeto -> Geral -> Seus apps -> no bloco de código mostrado, são as keys da variável `firebaseConfig`.
		 - Adicionar no root do projeto o arquivo `firebase.json`, recebido pelo discord.
- Após configurar os arquivos de configs:
	- Para rodar o projeto basta executar o comando no terminal `npm start` ou `yarn start`.

## Estrutura de pastas:

 - **src**: 
	 - Pasta source da aplicação.
	 - **server**:
		 - Pasta referente aos arquivos de configuração do servidor Node.
		 - **routes**: Pasta referente à importação de todas as rotas a serem utilizadas pelo server.
	- **modules**:
		- Pasta referente a cada entidade do sistema.
		- **routes:** Estão os arquivos de rotas da entidade.
		- **controllers:** Estão os arquivos de controladores (métodos a serem executados pelas rotas).
		- **repositories:** Estão os arquivos referentes à conexão com banco de dados e schemas das entidades.
