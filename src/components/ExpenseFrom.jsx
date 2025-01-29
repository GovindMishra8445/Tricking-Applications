import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";

const ExpenseFrom = ({
  expense,
  setExpense,
  setExpenses,
  editingRowId,
  setEditingRowId,
}) => {
  const [errors, setErrors] = useState({});

  const validationConfig = {
    title: [
      { required: true, errorMassage: "Please Enter the Title." },
      {
        minLength: 3,
        minLengthMassage: "Title Should be at least 3 Characters.",
      },
    ],
    category: [
      { required: true, errorMassage: "Please Enter the Select Category." },
    ],
    amount: [
      { required: true, errorMassage: "Please Enter the an Amount." },
      {
        pattern: /^(0|[1-9]\d*)$/,
        errorMassage: "Please Enter a Valid Number.",
      },
    ],
  };

  const validate = (formData) => {
    const errorData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorData[key] = rule.errorMassage;
          return true;
        }
        if (rule.minLength && value.length < 3) {
          errorData[key] = rule.minLengthMassage;
          return true;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errorData[key] = rule.errorMassage;
          return true;
        }
      });
    });

    // Simple Logic For Error Massage
    // if (!formData.title) {
    //   errorData.title = "Please Enter the Title";
    // }

    // if (!formData.category) {
    //   errorData.category = "Please Enter the Category";
    // }

    // if (!formData.amount) {
    //   errorData.amount = "Please Enter the Amount";
    // }

    setErrors(errorData);
    return errorData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateResult = validate(expense);
    if (Object.keys(validateResult).length) return;

    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return prevExpense;
        })
      );
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      setEditingRowId("");
      return;
    }
    setExpenses((prevSate) => [
      ...prevSate,
      { ...expense, id: crypto.randomUUID() },
    ]);

    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  // From Data Update Logic
  // const expense = { ...getFromData(e.target), id: crypto.randomUUID() };
  // setExpense((prevSate) => [...prevSate, expense]);
  // e.target.reset();

  // Get From Data Logic
  // const getFromData = (from) => {
  //   const formData = new FormData(from);
  //   const data = {};

  //   for (const [key, value] of formData.entries()) {
  //     data[key] = value;
  //   }
  //   return data;
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({});
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={expense.title}
        onChange={handleChange}
        placeholder="Please Enter the Menu"
        error={errors.title}
      />
      {/* <Select
        label="Select the Menu"
        id="category"
        name="title"
        value={expense.category}
        onChange={handleChange}
        options={[
          "Grocery",
          "Clothes",
          "Bills",
          "Education",
          "Medicine",
          "Grocery",
          "Clothes",
          "Bills",
          "Education",
          "Medicine",
        ]}
        placeholder="Please Enter the category"
        defaultOption="Select Category"
        error={errors.category}
      /> */}
      
      <Select
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        options={[
          "Grocery",
          "Clothes",
          "Bills",
          "Education",
          "Medicine",
          "Grocery",
          "Clothes",
          "Bills",
          "Education",
          "Medicine",
        ]}
        placeholder="Please Enter the category"
        defaultOption="Select Category"
        error={errors.category}
      />
      <div className="input-container">
        <Input
          label="Amount"
          id="amount"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          placeholder="Please Enter the Amount"
          error={errors.amount}
        />
      </div>
      <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
    </form>
  );
};

export default ExpenseFrom;
