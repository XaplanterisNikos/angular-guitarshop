import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

/**
 * Service responsible for providing form-related data such as countries, states, and credit card expiration dates.
 * @Injectable decorator makes this service injectable across the application.
 */
@Injectable({
  providedIn: 'root'// Configures Angular to provide this service at the root level
})
export class Luv2ShopFormService {

  /** URL to fetch countries data from the backend API. */
  private countriesUrl = 'http://localhost:8080/api/countries';

   /** URL to fetch states data from the backend API. */
  private statesUrl = 'http://localhost:8080/api/states';

  /**
   * Constructs a new Luv2ShopFormService.
   * @param httpClient The Angular HttpClient for making HTTP requests.
   */
  constructor(private httpClient: HttpClient) {

   }

   /**
   * Retrieves a list of countries from the backend API.
   * @returns An Observable that emits an array of Country objects.
   */
   getCountries():Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
   }

   /**
   * Retrieves a list of states for the specified country code from the backend API.
   * @param theCountryCode The country code for which states are to be fetched.
   * @returns An Observable that emits an array of State objects.
   */
   getStates(theCountryCode: string):Observable<State[]>{

      const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
      return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
        map(response => response._embedded.states)
      );
   }

   /**
   * Retrieves a list of credit card expiration months.
   * @param startMonth The starting month for the list.
   * @returns An Observable that emits an array of numbers representing months.
   */
  getCreditCardMonths(startMonth: number): Observable<number[]>{
    let data: number[] = [];

    for(let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }
    return of(data);
  }

  /**
   * Retrieves a list of credit card expiration years.
   * @returns An Observable that emits an array of numbers representing years.
   */
  getCreditCardYears():Observable<number[]>{
    let data: number[] =[];

    const startYear: number = new Date().getFullYear(); 
    const endYear: number = startYear +10;

    for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }
    return of(data);
  }
}

/** Interface representing the response structure for countries data from the backend API. */
interface GetResponseCountries{
  _embedded:{
    countries: Country[]; // Array of Country objects
  }
}

/** Interface representing the response structure for states data from the backend API. */
interface GetResponseStates{
  _embedded:{
    states: State[];// Array of State objects
  }
}
