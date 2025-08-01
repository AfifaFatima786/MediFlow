'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, Form } from "react-hook-form" 
import { FormFieldType } from "../forms/PatientForm"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Image from "next/image"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectValue, SelectContent, SelectTrigger } from "./select"
import { Textarea } from "./textarea"
import { Checkbox } from "@/components/ui/checkbox"


interface CustomProps{
    control:Control<any>
    fieldType:FormFieldType
    name:string,
    label?:string,
    placeholder?:string,
    iconSrc?:string,
    iconAlt?:string,
    disabled?:boolean,
    dateFormat?:string,
    showTimeSelect?:boolean,
    children?:React.ReactNode,
    renderSkeleton?:(field:any)=>React.ReactNode


}

const RenderField=({field,props}:{field:any;props:CustomProps})=>{

    const {fieldType,iconSrc,iconAlt,placeholder,showTimeSelect,dateFormat,renderSkeleton}=props;
    console.log("SELECTED:", field.value)


    switch(fieldType){
        case FormFieldType.INPUT:
            return(
                <div className="flex rounded-md border border-dark-500 bg-dark-400">

                    {iconSrc && (
                    <Image
                    src={iconSrc }
                    alt={iconAlt ||'icon'}
                    height={24}
                    width={24}
                    

                    className='ml-2'
                    
                    />
                    )}


                    <FormControl>
                        <Input
                        placeholder={placeholder}
                        {...field}
                        className="shad-input border-0"
                        
                        />


                    </FormControl>


                    
                    

                </div>
            )

        case FormFieldType.PHONE_INPUT:
            return(
                <FormControl>
                    <PhoneInput
                    defaultCountry="US"
                    placeholder={placeholder}
                    international
                    withCountryCallingCode
                    value={field.value as string | undefined}
                    onChange={field.onChange}
                    className="input-phone z-10"
                    
                    />
                </FormControl>
            )

          case FormFieldType.DATE_PICKER:
            return(
              <div className="flex rounded-md border border-dark-500 bg-dark-400">
                <Image
                src="/assets/icons/calendar.svg"
                height={24}
                width={24}
                alt="calender"
                className="ml-2"
                />

                <FormControl>
                  <DatePicker 
                    selected={field.value} 
                    onChange={(date) => {
                      console.log('DatePicker onChange:', date);
                      field.onChange(date);
                    }}
                     placeholderText={props.placeholder || "Select date"}
                     dateFormat={dateFormat ?? 'MM/dd/yyyy' }
                     showTimeSelect={showTimeSelect ?? false}
                     timeInputLabel="Time:"
                    wrapperClassName="date-picker"
                    
                    isClearable={true}
                  />
                </FormControl>
              </div>
            )

          case FormFieldType.SELECT:
            return(
              <FormControl>
                <Select onValueChange={(value) => field.onChange(value)}
                value={field.value}>
                  
                  <SelectTrigger
                    className="shad-select-trigger"
                  >
                    <SelectValue
                      placeholder={placeholder} 
                    />
                  </SelectTrigger>
                  <SelectContent className="shad-select-content">
                    {props.children}
                  </SelectContent>
                </Select>
              </FormControl>
            )


          case FormFieldType.CHECKBOX:
            return(
              <FormControl>
                <div className="flex items-center gap-4">
                  <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange}/> 

                <label htmlFor={props.name}
                className="checkbox-label">
                  {props.label}

                </label>
                </div>
              </FormControl>
            )

          case FormFieldType.SKELETON:
            return(
              <FormControl>
          {renderSkeleton ? renderSkeleton(field) : null}
        </FormControl>
            )
          case FormFieldType.TEXTAREA:
            return (
              <FormControl>
                <Textarea
                  placeholder={placeholder}
                  {...field}
                  className="shad-textArea"
                  disabled={props.disabled}
                />
              </FormControl>
            )
          default:
            return null;

    }

}
 

const CustomFormField = (props:CustomProps) => {
    const {control,fieldType,name,label}=props;
  return (
    <div className=""><FormField
              control={control}
              name={name}
              render={({ field }) => (
                <FormItem className="flex-1">
                  {fieldType!=FormFieldType.CHECKBOX && label &&(
                    <FormLabel>{label}</FormLabel>
                  )}

                  <RenderField field={field} props={props}/>
                  
                  <FormMessage className="shad-error"/>



                </FormItem>
              )}
            /> 
            


            </div>
  )
}

export default CustomFormField