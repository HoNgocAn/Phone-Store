import React from 'react';
import "./AddProduct.scss";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { createProduct } from '../../services/productService';
import { useNavigate } from 'react-router-dom';


function AddProduct(props) {

    const navigate = useNavigate()

    // Schema validation using Yup
    const validationSchema = Yup.object({
        name: Yup.string().required('Product name is required'),
        price: Yup.number()
            .required('Price is required')
            .positive('Price must be a positive number')
            .integer('Price must be an integer'),
        quantity: Yup.number()
            .required('Quantity is required')
            .positive('Quantity must be a positive number')
            .integer('Quantity must be an integer'),
        nation: Yup.string().required('Country is required')
    });

    const initialValues = {
        name: '',
        price: 0,
        quantity: 0,
        nation: '',
        image: "" // Initialize with null
    };

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log("check value", values);

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('quantity', values.quantity);
            formData.append('nation', values.nation);

            // Ensure image is a valid File object
            if (values.image && values.image instanceof File) {
                formData.append('image', values.image);
            } else {
                console.error('Invalid file input');
            }


            let rs = await createProduct(formData); // Update API call to send formData


            if (rs && rs.EC === 0) {
                toast.success(rs.EM)
                resetForm();
            } else {
                toast.error(rs.EM)
            }

        } catch (error) {
            toast.error('Có lỗi xảy ra khi thêm sản phẩm');
        } finally {
            setSubmitting(false);
        }
    };

    const handleComeBack = () => {
        navigate("/")
    }

    return (
        <div className="form-container">
            <h2>Form Add Product</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="name">Product Name</label>
                            <Field type="text" id="name" name="name" />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <Field type="number" id="price" name="price" />
                            <ErrorMessage name="price" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="quantity">Quantity</label>
                            <Field type="number" id="quantity" name="quantity" />
                            <ErrorMessage name="quantity" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nation">Nation</label>
                            <Field type="text" id="nation" name="nation" />
                            <ErrorMessage name="nation" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Product photo</label>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                onChange={(event) => {
                                    setFieldValue("image", event.currentTarget.files[0]);
                                }}
                            />
                            <ErrorMessage name="image" component="div" className="error" />
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className='btn btn-primary' type="button" onClick={() => handleComeBack()} >
                                Come Back
                            </button>
                            <button className='btn btn-warning' type="submit" disabled={isSubmitting}>
                                Add Product
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddProduct;