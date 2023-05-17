import React, { useState } from "react";
import axios from "axios";
import { MdDelete, MdRefresh } from "react-icons/md";

/**
 * Calculator component that allows users to perform calculations
 * and view the calculation history.
 */

const Calculator = () => {
  const [result, setResult] = useState("");// State to store the current result
  const [newresults, setNewResults] = useState([]); // State to store the calculation history

  // Handle button click event to update the result

  const handleClick = (e) => {
    setResult(result.concat(e.target.name));
  };

  // Handle clear button click event to clear the result

  const handleClear = () => {
    setResult("");
  };

  // Handle delete button click event to delete the last character from the result

  const handleDelete = () => {
    setResult(result.slice(0, -1));
  };

  // Handle calculate button click event to perform the calculation

  const handleCalculate = () => {
    try {
      const calculatedResult = eval(result);
      setResult(calculatedResult.toString());

      const historyItem = {
        expression: result,
        result: calculatedResult.toString(),
      };

      // Save the calculation history to the server

      axios.post("http://localhost:5000/history", historyItem);

      setNewResults([...newresults, historyItem]);
    } catch (error) {
      setResult("Error");
    }
  };

  // Handle percentage button click event to calculate the percentage

  const handlePercentage = () => {
    try {
      const parsedResult = eval(result);
      const percentage = (parsedResult / 100).toString();
      setResult(percentage);
    } catch (error) {
      setResult("Error");
    }
  };

  // Handle refresh button click event to recalculate a specific history item

  const handleRefresh = (_id) => {
    const refreshedItem = { ...newresults[_id] };
    try {
      console.log("working")
      const calculatedResult = eval(refreshedItem.expression);
      refreshedItem.result = calculatedResult.toString();

      // Update the refreshed item on the server

      axios.put(`http://localhost:5000/history/${_id}`, refreshedItem).then(() => {
        setNewResults((prevResults) => {
          const updatedResults = [...prevResults];
          updatedResults[_id] = refreshedItem;
          return updatedResults;
        });
      });
    } catch (error) {
      refreshedItem.result = "Error";
      setNewResults((prevResults) => {
        const updatedResults = [...prevResults];
        updatedResults[_id] = refreshedItem;
        return updatedResults;
      });
    }
  };

  // Handle deletion of a calculation from the history

  const deleteCalculation = (index, id) => {
    axios
      .delete(`http://localhost:5000/history/${id}`)
      .then(() => {
        setNewResults((prevHistory) =>
          prevHistory.filter((data, i) => i !== index)
        );
      })
      .catch((error) => {
        console.log("Error deleting calculation:", error);
      });
  };



  return (
    <>

      {/*================= Calculator UI =================*/}

      <div className="flex flex-col w-100 mx-auto my-8 bg-gray-950 p-4">

        {/*================= Result display =================*/}

        <input
          type="text"
          className="w-full p-2 mb-4 text-right border border-gray-300 rounded"
          value={result}
          readOnly
        />

        {/*================= Calculator buttons =================*/}

        <div className="grid grid-cols-4 gap-2">
          <button
            name="7"
            onClick={handleClick}
            className="p-2 bg-gray-200 rounded"
          >
            7
          </button>
          <button
            name="8"
            onClick={handleClick}
            className="p-2 bg-gray-200 rounded"
          >
            8
          </button>
          <button
            name="9"
            onClick={handleClick}
            className="p-2 bg-gray-200 rounded"
          >
            9
          </button>
          <button
            name="/"
            onClick={handleClick}
            className="p-2 bg-orange-500 text-white rounded"
          >
            ÷
          </button>
          <button
            name="4"
            onClick={handleClick}
            className="p-2 bg-gray-200 rounded"
          >
            4
          </button>
          <button
            name="5"
            onClick={handleClick}
            className="p-2 bg-gray-200 rounded"
          >
            5
          </button>
          <button
            name="6"
            onClick={handleClick}
            className="p-2 bg-gray-200 rounded"
          >
            6
          </button>
          <button
            name="*"
            onClick={handleClick}
            className="p-2 bg-orange-500 text-white rounded"
          >
            ×
          </button>
          <button
            name="1"
            onClick={handleClick}
            className="p-2 bg-gray-200 rounded"
          >
            1
          </button>
          <button
            name="2"
            onClick={handleClick}
            className="p-2 bg-gray-200 rounded"
          >
            2
          </button>
          <button
            name="3"
            onClick={handleClick}
            className="p-2 bg-gray-200 rounded"
          >
            3
          </button>
          <button
            name="-"
            onClick={handleClick}
            className="p-2 bg-orange-500 text-white rounded"
          >
            -
          </button>
          <button
            name="."
            onClick={handleClick}
            className="p-2 bg-gray-200 rounded"
          >
            .
          </button>
          <button
            name="0"
            onClick={handleClick}
            className="p-2 bg-gray-200 rounded"
          >
            0
          </button>
          <button
            name="="
            onClick={handleCalculate}
            className="col-span-2 p-2 bg-orange-500 text-white rounded"
          >
            =
          </button>
          <button
            name="+"
            onClick={handleClick}
            className="p-2 bg-orange-500 text-white rounded"
          >
            +
          </button>
          <button
            name="clear"
            onClick={handleClear}
            className="p-2 bg-red-500 text-white rounded"
          >
            C
          </button>
          <button
            name="delete"
            onClick={handleDelete}
            className="p-2 bg-orange-500 text-white rounded"
          >
            Delete
          </button>
          <button
            name="%"
            onClick={handlePercentage}
            className="p-2 bg-orange-500 text-white rounded"
          >
            %
          </button>
        </div>
      </div>

      {/*================= Calculation history =================*/}

      <div className="scroll-py-10 snap-y h-72 overflow-scroll table-fixed">
        <table>
          <thead>

            {/*================= Table header =================*/}

            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S.No.
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Calculation
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Result
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            {/*================= Table rows =================*/}

            {newresults.map((data, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {data.expression}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {data.result}
                </td>
                <td>

                  {/*================= Refresh button =================*/}

                  <button
                    onClick={() => handleRefresh(data.id)}
                    className="flex items-center justify-center px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
                  >
                    <MdRefresh className="text-gray-500 hover:text-gray-700" />
                  </button>
                </td>
                <td>

                  {/*================= Delete button =================*/}

                  <button
                    className="flex items-center justify-center px-2 py-1 rounded-md bg-red-200 hover:bg-red-300"
                    onClick={() => deleteCalculation(index, data._id)}
                  >
                    <MdDelete className="text-red-500 hover:text-red-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calculator;
