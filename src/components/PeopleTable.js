import React from 'react'
import { Table } from 'react-bootstrap'
import { IoIosArrowUp as UpArrow, IoIosArrowDown as DownArrow } from 'react-icons/io'
import { people_categories } from '../constants'




export default class PeopleTable extends React.Component {

	state = {
		sort: "id",
		order: -1 // ASC = -1, DESC = 1
	}

	sortPeople = ()=> this.props.people.sort(this.compare)

	compare = (a,b) => {
		let attr = this.state.sort

		if ( a[attr] < b[attr] ) return this.state.order
		else if ( a[attr] > b[attr] ) return this.state.order * -1
		else return 0 
	}

	renderTableHeadings = () => {
		return people_categories.map( (category, index) => {
			let icon = null
			let className = "table-heading"

			if (category.attribute === this.state.sort) {
				className += " active-col"
				if (this.state.order === -1)
					icon = <UpArrow className="svg-align" />
				else
					icon = <DownArrow className="svg-align" />
			}

			return (
				<th key={index} className={className} onClick={()=> this.handleColumnClick(category.attribute)}>
					{category.display} {icon}
					<div className="bottom"></div>
				</th>
			)
		})
	}

	renderTableRows = () => {
		return this.sortPeople().map( (person, index) =>
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

	getClassName = ()=> this.props.nightMode ? "people-table table-dark" : "people-table"


	render() {
		return (
			<Table striped hover className={this.getClassName()}>
				<thead className="table-head">
					<tr>
					{ this.renderTableHeadings() }
					</tr>
				</thead>
				<tbody className="table-body">
					{ this.renderTableRows() }
				</tbody>
			</Table>
		)
	}
}
