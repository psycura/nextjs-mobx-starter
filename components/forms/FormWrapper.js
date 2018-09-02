// @flow
import { observer } from 'mobx-react'
import Input from './Input'
import { Formik } from 'formik'
import React, { Component, Fragment } from 'react';
import * as yup from 'yup';

const api = user =>
    new Promise ( ( resolve, reject ) => {
        setTimeout ( () => {
            if ( user.email !== 'test@mail.com' ) {
                reject ( { email: 'email already in use' } )
            } else {
                resolve ( 'ok' )
            }
        }, 3000 )
    } )

class FormWrapper extends Component<{}> {
    
    _onSubmit = async ( values, bag ) => {
        const response = await api ( values )
        .catch ( ( err ) => {
            bag.setSubmitting ( false )
            bag.setErrors ( err )
        } )
        if ( response ) {
            alert ( 'User registered' )
        }
    }
    
    render () {
        return (
            <div className="FormWrapper">
                <Formik
                    initialValues={{ email: '', password: '', confirmPassword: '' }}
                    onSubmit={this._onSubmit}
                    validationSchema={
                        yup.object ().shape ( {
                            email:           yup.string ().email ( 'Enter the valid password' ).required (),
                            password:        yup.string ().min ( 6 ).required (),
                            confirmPassword: yup.string ()
                                             .oneOf ( [yup.ref ( 'password', null )], 'Password should match' )
                                             .required ()
                        } )
                    }
                    render={( {
                        values, handleSubmit, handleChange, handleBlur,
                        errors, isValid, touched, isSubmitting
                    } ) => (
                        <Fragment>
                            <Input placeholder='Enter your email'
                                   label='Email'
                                   onChange={handleChange}
                                   name='email'
                                   touched={touched.email}
                                   onBlur={handleBlur}
                                   error={errors.email}
                                   value={values.email}/>
                            <Input placeholder='Enter the password' type='password'
                                   label='Password'
                                   onChange={handleChange}
                                   name='password'
                                   touched={touched.password}
                                   onBlur={handleBlur}
                                   error={errors.password}
                                   value={values.password}/>
                            <Input placeholder='Confirm the password' type='password'
                                   label='ConfirmPassword'
                                   onChange={handleChange}
                                   name='confirmPassword'
                                   onBlur={handleBlur}
                                   touched={touched.confirmPassword}
                                   error={errors.confirmPassword}
                                   value={values.confirmPassword}/>
                            <button disabled={!isValid || isSubmitting} onClick={handleSubmit} type='submit'>Submit
                            </button>
                        </Fragment>
                    )}
                />
            
            </div>
        );
    }
}

export default observer ( FormWrapper );
