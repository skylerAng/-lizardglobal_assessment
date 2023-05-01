import "./multiselect.scss";

import React, { useState, useEffect, useCallback } from 'react';
import Select, { components } from 'react-select';
import categories from './Categories';

const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '5px',
      borderColor: state.isFocused ? '#0077B5' : provided.borderColor,
      boxShadow: state.isFocused ? '0 0 0 2px #0077B5' : provided.boxShadow,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#0077B5' : provided.backgroundColor,
      color: state.isSelected ? '#ffffff' : provided.color,
      ':hover': {
        backgroundColor: state.isFocused ? provided.backgroundColor : '#f9f9f9',
        color: state.isFocused ? '#ffffff' : provided.color,
      },
      fontWeight: state.isSelected ? 'bold' : provided.fontWeight,
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.color,
      borderRadius: '5px',
      color: '#ffffff',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#ffffff',
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: state.isFocused ? '#ffffff' : provided.color,
      ':hover': {
        backgroundColor: state.isFocused ? '#ffffff' : '#0077B5',
        color: state.isFocused ? '#0077B5' : '#ffffff',
      },
    }),
  };
  
  const MultiSelect = (props) => {
    
    const [hoveredOption, setHoveredOption] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOnChange = (selectedOptions) => {
      setSelectedOptions(selectedOptions);
    };
  
    useEffect(() => {
      console.log('Selected options:', selectedOptions);
      props.handleCategoryChange(selectedOptions);
    }, [selectedOptions]);
  


  

    // useEffect(() => {
    
    //   if (props.handleCategoryChange) {
    //     debugger;
    //     props.handleCategoryChange(selectedOptions);
    //   }
    // }, [selectedOptions]);
    // const handleCategoryChange = (selectedOptions) => {
    //   setSelectedOptions(selectedOptions)
 
    //   debugger;
    // };
  
    const customTheme = (theme) => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary: hoveredOption ? hoveredOption.color : '#0077B5',
        primary25: hoveredOption ? hoveredOption.color : '#0077B5',
        primary75: hoveredOption ? hoveredOption.color : '#0077B5',
        neutral0: props.darkMode ? theme.colors.neutral80 : theme.colors.neutral0,
        neutral50: '#f9f9f9', // set the background color of the dropdown
      },
    });
  
    const CustomOption = (props) => {
      const { innerProps, innerRef } = props;
      const isHovered = props.isFocused || hoveredOption?.value === props.value;
  
      return (
        <components.Option
          {...props}
          innerProps={{
            ...innerProps,
            onMouseEnter: () => setHoveredOption(props.data),
            onMouseLeave: () => setHoveredOption(null),
          }}
          innerRef={innerRef}
          isFocused={isHovered}
        />
      );
    };
  
    return (
      <Select
        className="multiselect"
        isMulti
        options={categories}
        styles={customStyles}
        theme={customTheme}
        components={{ Option: CustomOption }}
        onChange={handleOnChange}
      />
    );
  };
export default MultiSelect;