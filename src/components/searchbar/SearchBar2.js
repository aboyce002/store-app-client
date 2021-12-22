import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, withRouter } from 'react-router-dom';
import * as actions from "../../utils/actions";
import { Box, Input, FormControl, FormErrorMessage, Button, SubmitButton, HStack } from '@chakra-ui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FiSearch } from 'react-icons/fi';
import fakeStoreApi from '../../api/fakeStoreApi';
import ProductList from '../productList/ProductList';

class SearchBar extends Component {
  state = {term: '', productList: []};

  //products: this.props.fetchProduct(), 
  //const [products, setProducts] = useState([]);

/*  onInputChange = (event) => {
    //console.log(event.target.value);
    console.log(this.state.term);
  }*/

/*  onSubmit = (actions, values) => {
    fakeStoreApi.get('/products', {
      //params: { query: this.state.term }
    }).then(res=>res.json())
    .then(json=>console.log(json));

    const { history } = this.props;
    history.push('/search');
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);ss
    }, 1000);
  }*/

  submitForm = async term =>  {
    const response = await fakeStoreApi.get('/products', {
      //params: { query: this.state.term }
    });
    this.setState({productList: response.data});
    //console.log(this.state.term);
    //}).then(json=>console.log(json));

    //const { history } = this.props
    //history.push('/search');
  }

/*  handleSubmit = (values, formikBag, actions) => {
    actions.setSubmitting(true)
    console.log(values)
    console.log(actions)
    
    this.submitForm();
}*/

  render() {
    return (/*
        <Formik
           validate={values => {
            const errors = {};
            if (!values.search) {
              errors.search = '';
            }
            return errors;
          }}
          initialValues={{ term: this.state.term }}
          onSubmit={this.onSubmit}
        >
          {(props, handleSubmit) => (
              <Form onSubmit={handleSubmit}>
                <HStack>
                    <Box>
                      <Field name="search">
                        {({props, field, form }) => (
                          <FormControl>
                            <Input {...field} id="search" variant="outline" color="black" bg="white" onChange={(event) => {this.setState({ term: event.target.value }); this.onInputChange(event);}}/>
                            <ErrorMessage name="search" component="div" />
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <button bg="none" type="submit">
                        <FiSearch/>
                      </button>
                    </Box>
                </HStack>
              </Form>
          )}
        </Formik>*/
        <>
        <button bg="none" onClick={this.submitForm}>
          <FiSearch/>
        </button>
        <ProductList productList={this.state.productList}/>
        </>
    )
  }
}

export default connect(null, actions)(withRouter(SearchBar));
