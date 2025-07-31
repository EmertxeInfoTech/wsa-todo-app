import { LucideTag, TagIcon, X } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import getLabelsAPI from "../api/getLabelsAPI";
import updateLabelsAPI from "../api/updateLabelsAPI";
import toast from "react-hot-toast";

const LabelSelector = ({
  task,
  selectedLabels,
  setSelectedLabels,
  placeholder = "Type a Label",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [labels, setLables] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [matchingLabels, setMatchingLabels] = useState([]);
  const dropdownRef = useRef(null);
  const taskId = task._id;

  const toggleSelector = useCallback(() => setIsOpen((isOpen) => !isOpen), []);

  //Handle labels which are not repeated again, while assigning into an new task
  const handleSetMatchingLabels = useCallback(
    (matchingLabelsToSet) => {
      const filteredLabels = matchingLabelsToSet.filter(
        (label) => !selectedLabels.includes(label)
      );
      setMatchingLabels(filteredLabels);
    },
    [selectedLabels]
  );

  const handleGetLabelResponse = useCallback(
    (responseData) => {
      setLables(responseData.labels || []);
      handleSetMatchingLabels(responseData.labels);
    },
    [handleSetMatchingLabels]
  );

  //Common Error Handle
  const handleError = useCallback((errorMsg) => {
    console.error(errorMsg);
    toast.error(errorMsg);
    setIsOpen(false);
  }, []);

  const handleUpdateResponse = useCallback(() => {
    //fetch all labels again after updating active task in Backend. labels are selected again if linked to another task
    getLabelsAPI(handleGetLabelResponse, handleError);
  }, [handleError, handleGetLabelResponse, isOpen]);

  //Fetch all updated labels => useEffect
  useEffect(() => {
    if (isOpen) getLabelsAPI(handleGetLabelResponse, handleError);
  }, [handleError, handleGetLabelResponse, isOpen]);

  //Update Label useEffect
  useEffect(() => {
    updateLabelsAPI(selectedLabels, taskId, handleUpdateResponse, handleError);
  }, [selectedLabels, taskId, handleUpdateResponse, handleError]);

  //Clicking outside the label => close the drop down
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleInputChange = useCallback(
    (event) => {
      const inputValue = event.target.value;
      setSearchInput(inputValue);

      const matching = labels.filter((label) => label.toLowerCase());
      handleSetMatchingLabels(matching);
    },
    [handleSetMatchingLabels, labels]
  );

  const handleLabelSelect = useCallback(
    (label) => {
      //Check if label is already selected
      if (!selectedLabels.includes(label)) {
        setSelectedLabels((prevSelectedLabels) => [
          ...prevSelectedLabels,
          label,
        ]);
      }
    },
    [handleSetMatchingLabels, selectedLabels, setSelectedLabels]
  );

  const handleLabelDeselect = useCallback(
    (label) => {
      setSelectedLabels((prevSelectedLabels) =>
        prevSelectedLabels.filter((item) => item !== label)
      );
      setSearchInput("");
      handleSetMatchingLabels([]);
    },
    [handleSetMatchingLabels, setSelectedLabels]
  );

  const handleCreateLabel = useCallback(() => {
    const newLabel = searchInput.trim();
    if (newLabel !== "" && !labels.includes(newLabel)) {
      setLables((prevLabels) => [...prevLabels, newLabel]);
      setSelectedLabels((prevSelectedLabels) => [
        ...prevSelectedLabels,
        newLabel,
      ]);
    }
  }, [handleSetMatchingLabels, labels, searchInput, setSelectedLabels]);

  const isTyping = useMemo(
    () => Boolean(searchInput.trim().length),
    [searchInput]
  );

  return (
    <div ref={dropdownRef} className="label-selector-container">
      <div
        className="view-task-info-box clickable flex"
        onClick={toggleSelector}
      >
        <TagIcon />
        <p className="label-12">Labels</p>
      </div>
      {isOpen && (
        <div className="label-selector label-12">
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder={placeholder}
          />

          <div className="labels-list-overflow">
            {!isTyping && (
              <ul className="selected-labels-list">
                {selectedLabels.map((label) => (
                  <li key={`${label}-selected`} className="selected-label">
                    <LucideTag width={13} height={13} />
                    {label}
                    <button onClick={() => handleLabelDeselect(label)}>
                      <X />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <ul className="matching-label-list">
              {matchingLabels.map((label) => (
                <li
                  key={`${label}-listed`}
                  onClick={() => handleLabelSelect(label)}
                  className="matching-label"
                >
                  <LucideTag width={13} height={13} />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {isTyping && !labels.includes(searchInput) && (
            <button onClick={handleCreateLabel} className="create-label-btn">
              Create
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LabelSelector;
