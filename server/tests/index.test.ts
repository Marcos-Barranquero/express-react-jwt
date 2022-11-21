// test for person

import { Person } from '../src/index'

describe('Person', () => {
  test('person has a name', () => {
    const person = new Person('John', 20)
    expect(person.name).toBe('John')
  })

  // age cant be negative
  test('age cant be negative', () => {
    expect(() => {
      new Person('John', -20)
    }).toThrow()
  })
})


