import React from 'react'
import { staticMenu } from '../menus'
import { SplitHero } from '../components/UI/Hero'
import { TwoByTwoSection } from '../components/UI/Section'
import HeaderWithLabel from '../components/UI/Section/Header'
import Column from '../components/UI/Section/Col'
import { Link } from 'react-router-dom'

const HomePage = props => {
  return (
    <>
      <SplitHero
        menu={staticMenu}
        heroClassName={''}
        primaryCTA={{ to: '/login', text: 'Live demo' }}
        secondaryCTA={{
          to: 'https://github.com/randallmlough/invoiced',
          text: 'View source',
        }}
      >
        <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
          Invoicing for your
          <br className="xl:hidden" />
          <span className="xl:ml-3 text-primary-600">small business</span>
        </h2>
        <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Invoiced is an open sourced invoicing application{' '}
          <strong className="text-gray-900 font-bold">
            built with Rails, React, and PostgreSQL.
          </strong>{' '}
          Use it to quickly create and share invoices with others and view a
          dashboard tailored to you.
        </p>
      </SplitHero>
      <TwoByTwoSection>
        <HeaderWithLabel
          label="Features"
          title="It's full of cool stuff"
          subtitle="Invoiced is a showcase of what is possible in a fullstack production application."
        />
        <Column
          icon="user"
          title="Account management"
          subtitle="Register, Sign up, and log out."
        />
        <Column
          icon="key"
          title="Session management"
          subtitle="Invoiced leverages JWTs to determine the users access both on the client side and backend"
        />
        <Column
          icon="lock"
          title="Role Based Action Control"
          subtitle="Give roles to users by attaching those roles to the JWT. Rails backend will decode the jwt and will check if the user has permission to access or modify a resource beforehand."
        />
        <Column
          icon="columns"
          title="User Dashboard"
          subtitle="Unique dashboard to fetch monthly activity and KPI's. Users also have the ability to create custom date ranges to view update information right from the dashboard."
        />
        <Column
          icon="search"
          title="Global search"
          subtitle="Search for an invoice by either it's invoice number, the recipient's name or their email address to quickly locate and view."
        />
        <Column
          icon="filter"
          title="Invoice filtering"
          subtitle="Filter invoices by it's status (either paid or unpaid) and/or search for an invoice number as well (results will also update pagination)."
        />
      </TwoByTwoSection>
      <div className="bg-gray-800">
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-white sm:text-4xl sm:leading-10">
            Ready to check it out?
            <br />
            <span className="text-primary-600">Try the demo</span>
          </h2>
          <div className="mt-8 flex lg:flex-shrink-0 lg:mt-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                Demo
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="https://github.com/randallmlough/invoiced"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-primary-600 bg-white hover:text-primary-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                View source
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
