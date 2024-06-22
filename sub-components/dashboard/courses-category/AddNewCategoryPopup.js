// import node module libraries
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
// import widget/custom components
import { FormSelect, ReactQuillEditor } from "widgets";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
const AddNewCategoryPopup = () => {
  const [category, setCategories] = useState([]);
  const getcategory = async () => {
    try {
      const { data } = await axios.get("/api/category/getcategories");
      setCategories(data.categories);
    
      const categoryDataString = JSON.stringify(data.categories);
      localStorage.setItem("categories", categoryDataString);
    } catch (error) {
      toast.error("Error fetching categories");
      console.log("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    const storedCategoryDataString = localStorage.getItem("categories");
    if (storedCategoryDataString) {
      const storedCategoryData = JSON.parse(storedCategoryDataString);
      setCategories(storedCategoryData);
    }
    getcategory();
  }, [])
  //   const { pageIndex, globalFilter } = state;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const submitHandler = async ({ catName }) => {
    try {
      const result = await axios.post("/api/category/addcategories", {
        catName,
      });
      handleClose();
      toast.success("Course Category is Created Successfully");
     
    } catch (error) {
      toast.error("This category is exist!");
      console.log(error);
    }
  };
  return (
    <Fragment>
		<ToastContainer />
      {/*  Form  */}
      <Form onSubmit={handleSubmit(submitHandler)}>
        {/* Title  */}
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Write a Category"
            id="category-name"
            {...register("catName", {
              required: "Please enter category",
            })}
          />
          <Form.Text className="text-muted">.
            Field must contain a unique value
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add New Category
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddNewCategoryPopup;
