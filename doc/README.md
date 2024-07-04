This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## EN

### Introduction

The project is a Contact List made for the company "Leste Telecom" during a selective process. 

This Contact List includes filters, forms, statistics and the list itself.

### Technologies and libraries used during development

React with Next.js, Tailwind CSS, React Hot Toast, React Hook Form, Material-UI (MUI), Radix UI, shadcn and zustand.

To install them, it is necessary to run the npms below:

`npm i react-hot-toast`
`npm i react-hook-form`
`npm i @mui/material @emotion/react @emotion/styled`
`npm i @radix-ui/react-primitive @radix-ui/react-slot`
`npm i zustand`

### File Organization

- **model**: Defines the data structure (Contact interface) used in the application.
- **components**: Contains reusable React components that make up the user interface, such as forms, filters, statistical summaries, modal and list.
    - **page**: Contains contact's page component, where all reusable components are rendered.
- **lib**: Utility function of ContactsAPI, that handles communication with the external API granted for the challenge. Data is persisted in localstorage.
- **app**: Holds configuration files and application-specific components, including layout, app and globals.
- **store**: Manages the global state of the app by the ContactStore, simplifying the access and the manipulation of data in different parts of the app, and optimizing the API consumption with the localstorage for the CRUD realization.

### Application Features

#### Create contacts

- ContactForm, ContactModal, ContactsPage: The component ContactForm contains some fields to register a new Contact, by the ContactModal, which has a button to confirm the register displaying a toast and add the contact on the list, and a button to cancel. The function handleCreateEditContact controls if the contact is null, in this case, the creation modal is rendered.

#### Update contacts

- ContactForm, ContactModal and ContactCard: The contact is updated by a modal, and this modal is accessed by a button in a ContactCard rendered in ContactsPage. A different message is displayed on the toast in modal's top, if this modal is rendered by the update button.

#### Delete contacts

- ContactsList, ContactCard and ContactsPage: A button in a ContactCard that deletes a contact, the flow comes from the ContactsPage, sending to ContactList, which renders the card and pass the information to him. A toast is displayed after the contact is removed.

#### Filters

- ContactsPage and ContactFilters: The filters are rendered in ContactsPage, allowing the user to filter the cards of contacts, by gender, language, age and birthday month, in his fields.

#### Summaries

- ContactsList, GenderCount and LanguageCount: The GenderCount and LanguageCount are rendered in ContactsPage, displaying the total of contacts by gender and language.

### State Management with Zustand

This application leverages the Zustand library for managing the global state of contacts. The `ContactStore` is responsible for:

- **Loading Contacts:** Fetching contacts from either the API or localStorage.
- **Creating Contacts:** Adding new contacts to the list.
- **Updating Contacts:** Modifying existing contacts.
- **Deleting Contacts:** Removing contacts from the list.
- **Managing Contact in Edit Mode:** Storing the contact currently being edited.

#### Store Actions:

- `fetchContacts()`: Retrieves the contacts, prioritizing localStorage and consulting the API only if localStorage is empty.
- `createContact(contact: Contact)`: Adds a new contact to the list, generating a unique and sequential ID.
- `updateContact(contact: Contact)`: Updates an existing contact in the list.
- `deleteContact(id: number)`: Removes a contact from the list based on its ID.
- `setCreatingEditingContact(contact: Contact | null)`: Sets the contact that is currently being edited.

#### Data Persistence:

The store utilizes Zustand's `persist` middleware to automatically persist the `contacts` state in localStorage. This ensures that the data is preserved across user sessions.

### Tested Limitations

#### Language Summary

- There are only three columns displaying the languages, if there are more than 21 languages, they will not be displayed due to this ui  limitation.

## PT

### Introdução

Esse projeto é uma lista de contatos, feita para a empresa "Leste Telecom" durante o seu processo seletivo.

Essa lista de contatos contempla filtros, formulários, estatísticas, e a própria lista.

### Tecnologias e bibliotecas utilizadas durante o desenvolvimento

React with Next.js, Tailwind CSS, React Hot Toast, React Hook Form, Material-UI (MUI), Radix UI, shadcn and zustand.

Para instalá-las, é necessário rodar os npms abaixo:

`npm i react-hot-toast`
`npm i react-hook-form`
`npm i @mui/material @emotion/react @emotion/styled`
`npm i @radix-ui/react-primitive @radix-ui/react-slot`
`npm i zustand`

### Organização dos diretórios

- **model**: Define a estrutura de dados (interface Contact) da aplicação.
- **components**: Contém os componentes React reutilizáveis da interface 
(formulário, filtros, sumários estatísticos, modal, listagem).
    - **page**: Contém o componente de página de contatos, onde todos os componentes são renderizados.
- **lib**: Abriga função utilitária de ContactsAPI que lida com a comunicação com a API externa cedida no desafio. Dados são persistidos no localstorage.
- **app**: Contém arquivos de configuração/componentes específicos da aplicação, como layout, app e globals.
- **store**: Gerencia o estado global da aplicação através do ContactStore, simplificando o acesso e a manipulação de dados em diferentes partes da aplicação, e otimizando o consumo da API com o localstorage para a realização do CRUD.

### Funcionalidades da Aplicação

#### Criar Contatos

- ContactForm e ContactModal, ContactsPages: O componente ContactForm contém alguns campos para registrar um novo Contato, por meio do ContactModal, que por sua vez tem um botão para confirmar o registro exibindo um toast e adicionar o contato na lista, e um botão para cancelar. A função handleCreateEditContact controla se o contato for nulo, se for, o modal de criação será carregado.

#### Atualizar Contatos

- ContactForm, ContactModal and ContactCard: O contato é atualizado pelo modal, esse modal é acessado por um botão em um ContactCard renderizado em ContactsPage. Uma mensagem diferente é exibida no toast no topo do modal, caso o modal seja carregado por meio do botão de atualização.

#### Deletar Contatos

-  ContactList, ContactCard e ContactsPage: Um botão em um ContactCard que exclui um contato, o fluxo vem do ContactsPage, enviado para a ContactList, que por sua vez renderiza o card e passa para o card. Um toast é exibido após a remoção do contato.

#### Filtros

- ContactsPage e ContactFilters: Os filtros são renderizados no componente pai ContactsPage, permitindo ao usuário filtrar os cartões de contatos por gênero, idioma, idade e mês de aniversário, em seus campos.

#### Sumários

- ContactsList, GenderCount e LanguageCount: Os resumos estatíscos de GenderCount e LanguageCount são renderizados no componente pai ContactsPage, exibindo o total de contatos por gender e language.

### Gerenciamento de Estado com Zustand

Essa aplicação utiliza a biblioteca Zustand para gerenciar o estado global dos contatos. A store `ContactStore` é responsável por:

- **Carregar Contatos:** Buscar os contatos da API ou do localStorage.
- **Criar Contatos:**  Adicionar novos contatos à lista.
- **Atualizar Contatos:**  Modificar contatos existentes.
- **Excluir Contatos:**  Remover contatos da lista.
- **Gerenciar Contato em Edição:**  Armazenar o contato que está sendo editado no momento.

#### Ações da Store:

- `fetchContacts()`: Busca os contatos, priorizando o localStorage e consultando a API apenas se o localStorage estiver vazio.
- `createContact(contact: Contact)`: Adiciona um novo contato à lista, gerando um ID único e sequencial.
- `updateContact(contact: Contact)`: Atualiza um contato existente na lista.
- `deleteContact(id: number)`: Remove um contato da lista com base no ID.
- `setCreatingEditingContact(contact: Contact | null)`: Define o contato que está sendo editado.

#### Persistência de Dados:

A store utiliza o middleware `persist` do Zustand para persistir automaticamente o estado `contacts` no localStorage. Isso garante que os dados sejam preservados entre as sessões do usuário, sem chamadas desenecessárias à API.

### Limitações Testadas

#### Language Summary

- Existem apenas três colunas exibindo as langauges, se existirem mais do que 21 languages, elas não vão ser exibidas na interface corretamente devido a essa limitação da ui.