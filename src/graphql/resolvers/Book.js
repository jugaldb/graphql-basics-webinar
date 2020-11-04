const Book = {
  author: {
    resolve(parent, args, { prisma }, info) {
      return users.find((user)=>{
        return user.id == parent.author
      })
    }
  }
}



const users = [
  {
    name: "Jugal",
    email: "jugal@gmail.com",
    age: "19",
    id: "1",
  },
  {
    name: "akshat",
    email: "akshat@gmail.com",
    age: "20",
    id: "2",
  }
]

module.exports = Book