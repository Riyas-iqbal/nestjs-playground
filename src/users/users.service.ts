import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    // Sample Data from DB
    private users = [
        {
            id: 1,
            name: 'John',
            age: 31,
            email: 'john@example.com',
            role: 'ADMIN'
        }, {
            id: 2,
            name: 'Alex',
            age: 20,
            email: 'Alex@example.com',
            role: 'INTERN'
        }, {
            id: 3,
            name: 'Harry',
            age: 40,
            email: 'harry@example.com',
            role: 'ENGINEER'
        }, {
            id: 4,
            name: 'Nancy',
            age: 18,
            email: 'nancy@example.com',
            role: 'INTERN'
        }, {
            id: 5,
            name: 'Georgia',
            age: 21,
            email: 'grg@example.com',
            role: 'INTERN'
        }
    ]
    
    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if (user) {
            return user
        }

        return 'User doesnt exist with id:' + id
    }

    create(user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN', age: number }) {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const highestId = userByHighestId[0].id
        const newUser = {
            id: highestId + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUser: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN', age?: number }) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUser }
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number) {
        const removeUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
    }
} 
