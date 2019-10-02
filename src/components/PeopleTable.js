import React from 'react'
import { Table } from 'react-bootstrap'
import { IoIosArrowUp as UpArrow, IoIosArrowDown as DownArrow } from 'react-icons/io'


const categories = [
	{ display: "ID", attribute: "id"},
	{ display: "Name", attribute: "last_name"},
	{ display: "Email", attribute: "email_address"},
	{ display: "Job Title", attribute: "title"}
]


export default class PeopleTable extends React.Component {

	state = {
		sort: "id",
		order: -1 // ASC = -1, DESC = 1
	}

	sortPeople = ()=> {
		let sortedPeople = this.props.people.sort(this.compare)
		// console.log(sortedPeople)
		return sortedPeople
	}

	compare = (a,b) => {
		let attr = this.state.sort
		
		if ( a[attr] < b[attr] ) return this.state.order
		else if ( a[attr] > b[attr] ) return this.state.order * -1
		else return 0 
	}

	renderTableHeading = (category, index) => {
		let icon = null
		let className = ""

		if (category.attribute === this.state.sort) {
			className += "active-col"
			if (this.state.order === -1)
				icon = <UpArrow/>
			else
				icon = <DownArrow/>
		}

		return (
			<th key={index} className={className}>
				<span className="table-heading" onClick={()=> this.handleColumnClick(category.attribute)}>
					{category.display} {icon}
				</span>
			</th>
		)
	}

	renderTableRow = (person, index) => {
		return (
			<tr key={index}>
				<td>{person.id}</td>
				<td>{person.last_name}, {person.first_name}</td>
				<td>{person.email_address}</td>
				<td>{person.title}</td>
			</tr>
		)
	}

	handleColumnClick = column => {
		if (column === this.state.sort)
			this.setState({ order: this.state.order * -1 })
		else
			this.setState({ sort: column, order: -1 })
	}


	render() {
		return (
			<Table striped className="people-table">
				<thead className="table-head">
					<tr>
					{ categories.map(this.renderTableHeading) }
					</tr>
				</thead>
				<tbody className="table-body">
					{ this.sortPeople().map(this.renderTableRow) }
				</tbody>
			</Table>
		)
	}
}
