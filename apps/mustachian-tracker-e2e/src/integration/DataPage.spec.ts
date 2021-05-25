import { eachMonthOfInterval, format } from 'date-fns/fp'

describe('/', () => {
  beforeEach(() => cy.visit('/'))

  it('assert', () => {
    const now = new Date()

    // assert
    cy.findByRole('heading', { name: 'Mustachian Tracker' }).should('exist')
    cy.findByText(
      /Track your wealth investing 5 minutes per month. Just edit the*/,
    ).should('exist')
    cy.findByRole('link', { name: 'spreadsheet' }).should('exist')

    // years
    cy.findByRole('button', { name: now.getFullYear().toString() }).should(
      'exist',
    )
    cy.findByRole('button', { name: 'Add year' }).should('exist')

    // spreadsheet
    cy.findByRole('cell', { name: 'Asset' }).should('exist')
    cy.findByRole('cell', { name: 'Category' }).should('exist')
    cy.findByRole('cell', { name: 'Currency' }).should('exist')
    eachMonthOfInterval({
      start: new Date(now.getFullYear(), 0),
      end: new Date(now.getFullYear(), 11),
    }).map((m) =>
      cy.findByRole('cell', { name: format('MMM yy', m) }).should('exist'),
    )

    cy.findAllByRole('row', { name: '' }).should('have.length', 1)
    cy.findByRole('button', { name: 'Add row' }).should('exist')
  })

  it('add a new year', () => {
    const now = new Date()

    cy.findAllByRole('cell', { name: '' }).eq(0).type('existing table{enter}')
    cy.findAllByRole('cell', { name: 'existing table' }).should('exist')

    cy.findByRole('button', {
      name: (now.getFullYear() - 1).toString(),
    }).should('not.exist')
    cy.findByRole('button', { name: 'Add year' }).click()
    cy.findByRole('button', {
      name: (now.getFullYear() - 1).toString(),
    }).should('exist')

    cy.findAllByRole('cell', { name: 'existing table' }).should('not.exist')

    cy.findByRole('button', {
      name: now.getFullYear().toString(),
    }).click()
  })

  it('add a new row', () => {
    cy.findByRole('button', { name: 'Add row' }).click()
    cy.findAllByRole('row', { name: '' }).should('have.length', 2)

    cy.findByRole('button', { name: 'Add row' }).click()
    cy.findAllByRole('row', { name: '' }).should('have.length', 3)

    cy.findAllByRole('cell', { name: '' }).eq(0).type('asset name{enter}')
    cy.findAllByRole('cell', { name: '' }).eq(1).type('CHF{enter}')

    cy.reload()

    cy.findAllByRole('cell', { name: 'asset name' }).should('exist')
    cy.findAllByRole('cell', { name: 'CHF' }).should('exist')
  })
})
