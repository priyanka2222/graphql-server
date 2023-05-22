const { ApolloServer, gql } = require('apollo-server')
const employees = [
    {id:"1", name:"John Oliver", dept: "HR"},
    {id:"2", name:"Steve Briggs", dept: "Engineering"},
    {id:"3", name:"David Rogers", dept: "Engineering"},
]
// Apollo Schema 
const typeDefs = gql`
    type Employee{
        id: ID,
        name: String
        dept: String
    }
    type Query{
        employee(id: ID!): Employee
        employees: [Employee]
    }
`
// Apollo Query 
const resolvers = {
    Query:{
        employees: () => employees,
        employee: (parent, { id }) =>
            employees.find((employee)=> employee.id === id)
    }
} 
// Apollo Server 
const PORT = 4000
const server = new ApolloServer({typeDefs, resolvers}) 
server.listen(PORT).then(({url}) => {
        console.log(`Server ready at ${url}`)
})
