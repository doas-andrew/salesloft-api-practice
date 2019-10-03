import React from 'react'
import { Table } from 'react-bootstrap'
import { IoIosArrowUp as UpArrow, IoIosArrowDown as DownArrow } from 'react-icons/io'
import { defaultCount, frequency_categories } from '../constants'


export default class FrequencyTable extends React.Component {

	state = {
		sort: "count",
		order: 1 // ASC = -1, DESC = 1
	}

	countChars = ()=> {
		let count = Object.assign({}, defaultCount)
		let emails = this.props.people.map( p => p.email_address )

		emails.forEach( email => {
			for (let char of email)
				count[char] = ( count[char] ? count[char]+1 : 1 )
		})

		this.char_count = count
	}

	sortCountKeys = ()=> {
		let keys = Object.keys( this.char_count )

		if (this.state.sort === "count")
			return keys.sort(this.compareValues)
		else
			return keys.sort(this.compareKeys)
	}

	compareKeys = (a,b) => {
		if (a < b) return this.state.order
		if (a > b) return this.state.order * -1
		return 0
	}

	compareValues = (a,b) => {
		let count = this.char_count

		if (count[a] < count[b]) return this.state.order
		if (count[a] > count[b]) return this.state.order * -1
		return 0
	}

	renderTableRows = ()=> {
		return this.sortCountKeys().map(key =>
			<tr key={ key }>
				<td>{ key }</td>
				<td>{ this.char_count[key] }</td>
			</tr>
		)
	}

	renderTableHeadings = ()=> {
		return frequency_categories.map( (category, index) => {
			let icon = null
			let className = "table-heading"

			if (category.toLowerCase() === this.state.sort) {
				className += " active-col"
				if (this.state.order === -1)
					icon = <UpArrow className="svg-align" />
				else
					icon = <DownArrow className="svg-align" />
			}

			return (
				<th key={index} className={className} onClick={()=> this.handleColumnClick(category.toLowerCase())}>
					{category} {icon}
					<div className="bottom"></div>
				</th>
			)
		})
	}

	handleColumnClick = column => {
		if (column === this.state.sort)
			this.setState({ order: this.state.order * -1 })
		else
			this.setState({ sort: column, order: -1 })
	}

	getClassName = ()=> ( this.props.nightMode ? "frequency-table table-dark" : "frequency-table" )

	render() {
		this.countChars()

		return (
			<Table striped hover bordered className={this.getClassName()}>
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
