import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NEWS_CATEGORIES} from '../constants';
import {Country, GetNewsCommand, SearchCriteria} from '../models';
import {NewsService} from '../news.service';

@Component({
  selector: 'app-news-criteria',
  templateUrl: './news-criteria.component.html',
  styleUrls: ['./news-criteria.component.css']
})
export class NewsCriteriaComponent implements OnInit {

	// An array of Country objects representing available countries for news search
	countries: Country[] = []
	// An array of news categories
	categories = NEWS_CATEGORIES
	// The flag image of the selected country
	flag: string | undefined = ""
	// The form for setting the search criteria
	form!: FormGroup

	// The constructor of the NewsCriteriaComponent class
	constructor(private fb: FormBuilder , private newsSvc: NewsService) { }

	// Called after the component is initialized
	ngOnInit(): void {

		// Get the available list of countries for news search
		this.newsSvc.getCountries()
			.then(result => this.countries = result)

		// Initialize the search criteria form
		this.form = this.fb.group({
			code: this.fb.control('', [ Validators.required ]),
			category: this.fb.control('', [ Validators.required ])
		})
	}

	// Called when the selected country changes
	onCountryChange(selectElem: any) {
		const code = selectElem.target.value // Get the code of the selected country
		const country = this.countries.find(c => c.code == code) // Find the country object from the available countries
		this.flag = country?.flag // Set the flag of the selected country
	}

	// Called when the user performs a search
	performSearch() {
		// Get the search criteria from the form
		const criteria = this.form.value as SearchCriteria
		console.info('>>> criteria: ', criteria)

	// Execute the search using the NewsService
    this.newsSvc.execute.next({ criteria } as GetNewsCommand )
	}

}
