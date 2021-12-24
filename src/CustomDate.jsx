import React, {
    useEffect,
    useState,
    useRef,
    forwardRef,
    useImperativeHandle
  } from 'react';
  
const CustomDate =  React.forwardRef((props, ref) => {
    const [date, setDate] = useState(null);
    const refInput = useRef();
  
    const onDateChanged = event => {
      console.log(event.target.value);
      console.log(refInput.current);
      if (refInput.current) {
        refInput.current.setAttribute('max', '');
      }
      props.onDateChanged();
    };
  
  
    useImperativeHandle(ref, () => ({
      getDate() {
        return date;
      },
  
      setDate(date) {
        setDate(date);
      },
  
      setInputPlaceholder(placeholder) {
        if (refInput.current) {
          refInput.current.setAttribute('placeholder', placeholder);
        }
      },
  
      setInputAriaLabel(label) {
        if (refInput.current) {
          refInput.current.setAttribute('aria-label', label);
        }
      }
    }));
  
    return (
      <div>
        <input type="date" ref={refInput} data-input style={{ width: '100%' }} onChange={onDateChanged}/>
      </div>
    );
  });

  export default CustomDate;
  