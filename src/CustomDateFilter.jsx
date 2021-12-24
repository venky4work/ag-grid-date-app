import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
  } from 'react';
  import ReactDOM from 'react-dom';
  
  export default forwardRef((props, ref) => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setTodate] = useState('');
    const refFrom = useRef(null);
    const refTo = useRef(null);
  
    useEffect(() => {
      props.filterChangedCallback();
    }, [fromDate, toDate]);
  
    useImperativeHandle(ref, () => {
      return {
        isFilterActive() {
          return fromDate != null && fromDate !== '';
        },
  
        doesFilterPass(params) {
          return fromDate
            .toLowerCase()
            .split(' ')
            .every(
              (filterWord) =>
                props
                  .valueGetter(params.node)
                  .toString()
                  .toLowerCase()
                  .indexOf(filterWord) >= 0
            );
        },
  
        getModel() {
          return { value: fromDate };
        },
  
        setModel(model) {
          setFromDate(model ? model.value : '');
        },
  
        afterGuiAttached(params) {
          focus();
        },
  
        componentMethod(message) {
          alert(`Alert from PartialMatchFilterComponent: ${message}`);
        },
      };
    });
  
    const focus = () => {
      window.setTimeout(() => {
        const container = ReactDOM.findDOMNode(refFrom.current);
        if (container) {
          container.focus();
        }
      });
    };
  
    const onChangeFrom = (event) => {
      const newValue = event.target.value;
      if (fromDate !== newValue) {
        setFromDate(newValue);
      }
      if (refTo.current) {
        refTo.current.setAttribute('max', '2021-12-21');
      }
    };

    const onChangeTo = (event) => {
        const newValue = event.target.value;
        if (toDate !== newValue) {
          setTodate(newValue);
        }
      };
  
    const style = {
      border: '2px',
      borderRadius: '5px',
      width: '200px',
      height: '50px',
    };
  
    return (
      <div style={style}>
        <div>
        From:
        <input
          style={{ height: '20px' }}
          ref={refFrom}
          value={fromDate}
          type="date"
          onChange={onChangeFrom}
          className="form-control"
        />
        </div> 
        <div>
        To:
        <input
          style={{ height: '20px' }}
          ref={refTo}
          value={toDate}
          type="date"
          onChange={onChangeTo}
          className="form-control"
        />
      </div>
      </div>
    );
  });