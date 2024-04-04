import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaArrowDownLong } from "react-icons/fa6";
import { FaArrowUpLong } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { TbFilterSearch } from "react-icons/tb";

const TableContainer = styled.div`
  width: ${({ $tableContainerWidth }) =>
    $tableContainerWidth ? `${$tableContainerWidth}%` : "90%"};
  overflow: auto;
  margin: 30px auto;
  padding-bottom: 10px;
  min-height: 250px;
  max-height: 500px;
  height: fit-content;
  border: 1.5px solid #ccc;
  display: flex;
  position: relative;

  /* Standard scrollbar */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

  /* Webkit (Chrome, Safari) */
  &::-webkit-scrollbar {
    width: 4px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  /* Firefox */
  &::-moz-scrollbar {
    width: 8px;
  }

  &::-moz-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  /* For Edge */
  -ms-overflow-style: none;
`;
const TableColumn = styled.div`
  gap: 5px;
  height: 100%;
`;
const Cell = styled.input`
  padding: 8px;
  border: none;
  cursor: default;
  border: 1px solid #ccc;
  text-transform: capitalize;
  width: ${({ $colWidth }) =>
    $colWidth ? `${$colWidth}px` : "fit-content"} !important;
  background-color: #fff;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #eee;
  }
`;

const CellBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ddd;
  border: 1px solid #ccc;
  position: sticky;
  top: 0;
  padding: 8px;
  width: ${({ $colWidth }) =>
    $colWidth ? `${$colWidth}px` : "fit-content"} !important;

  & > .cellBoxDropDownIcon {
    opacity: 60%;
    box-sizing: content-box;
    font-size: 14px;

    &:hover {
      opacity: 1;
    }
  }
`;

const HeaderCell = styled.input`
  border: none;
  cursor: default;
  text-transform: capitalize;
  width: ${({ $colWidth }) =>
    $colWidth ? `${$colWidth}px` : "fit-content"} !important;
  background-color: #ddd;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #ddd;
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 100%;
  min-width: 300px !important;
  width: 100% !important;
  background-color: #fff;
  z-index: 99;
  border: 2px solid #ddd;
  cursor: pointer;
  background-color: #eee;

  left: ${({ last }) => (last === "1" ? "auto" : "-0.5px")};
  right: ${({ last }) => (last === "1" ? "0" : "auto")};
`;

const SortBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #cccccc57;
  padding: 6px;
  &:hover {
    background-color: #ccc;
  }

  & > .sortIcons {
    font-size: 15px;
  }

  & > span {
    font-size: 15px;
  }

  & > .searchIcon {
    box-sizing: content-box;
    font-size: 22px;
    padding: 6px;
    color: #fff;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    background-color: #666;
    cursor: pointer;
  }
`;
const BtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #cccccc57;
  padding: 10px;
`;

const Search = styled.input`
  padding: 8px;
  width: 90%;
`;

const ClearBtn = styled.div`
  box-sizing: content-box;
  background-color: #666;
  color: #fff;
  padding: 5px 10px;
  border-radius: 3px;

  &:hover {
    background-color: #444444;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: fixed;
  top: 150px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  & > .noDataAvailabeIcon {
    font-size: 23px;
  }
`;

const HeaderCellComponent = ({
  key_value,
  colWidth,
  last,
  originalData,
  setData,
  data,
}) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortAsc = () => {
    const dataCopy = JSON.parse(JSON.stringify(data));
    dataCopy.sort((a, b) =>
      a[key_value].toString().toLowerCase().trim() >
      b[key_value].toString().toLowerCase().trim()
        ? 1
        : -1
    );
    setData(dataCopy);
    setOpen(false);
  };
  const sortDesc = () => {
    const dataCopy = JSON.parse(JSON.stringify(data));
    dataCopy.sort((a, b) =>
      a[key_value].toString().toLowerCase().trim() >
      b[key_value].toString().toLowerCase().trim()
        ? -1
        : 1
    );
    setData(dataCopy);
    setOpen(false);
  };

  const handleIncludesSearch = () => {
    if (searchText === "") setData(originalData);
    else {
      const dataCopy = JSON.parse(JSON.stringify(originalData));
      const filteredData = dataCopy.filter((item) =>
        item[key_value].toLowerCase().includes(searchText.toLowerCase())
      );
      setData(filteredData);
    }
    setOpen(false);
  };

  const clearFilters = () => {
    setData(originalData);
    setSearchText("");
    setOpen(false);
  };

  return (
    <CellBox $colWidth={colWidth * 13} ref={dropdownRef}>
      <HeaderCell value={key_value} readOnly={true} $colWidth={colWidth * 8} />
      <FaAngleDown
        className="cellBoxDropDownIcon"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <DropDown last={last}>
          <SortBox onClick={sortAsc}>
            <FaArrowUpLong className="sortIcons" />
            <span>Sort Asc</span>
          </SortBox>

          <SortBox onClick={sortDesc}>
            <FaArrowDownLong className="sortIcons" />
            <span>Sort Desc</span>
          </SortBox>
          <SortBox style={{ gap: 0, cursor: "default" }}>
            <Search
              value={searchText}
              placeholder="Includes"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <IoSearch className="searchIcon" onClick={handleIncludesSearch} />
          </SortBox>

          <BtnBox>
            <ClearBtn onClick={clearFilters}>Clear Filters</ClearBtn>
          </BtnBox>
        </DropDown>
      )}
    </CellBox>
  );
};

const TableColComponent = ({
  key_value,
  data,
  last,
  originalData,
  setData,
}) => {
  const [colWidth, setColWidth] = useState(6);
  return (
    <TableColumn>
      {key_value.length >= 30
        ? setColWidth(30)
        : key_value.length > colWidth
        ? setColWidth(key_value.length)
        : null}

      <HeaderCellComponent
        key_value={key_value}
        colWidth={colWidth}
        last={last}
        originalData={originalData}
        data={data}
        setData={setData}
      />

      {data.length !== 0 &&
        data.map((item, idx) => {
          {
            colWidth === 30
              ? null
              : item[key_value].length >= 30
              ? setColWidth(30)
              : item[key_value].length > colWidth
              ? setColWidth(item[key_value].length)
              : null;
          }

          return (
            <Cell
              value={item[key_value].toString().trim()}
              readOnly={true}
              key={idx}
              $colWidth={colWidth * 13}
            />
          );
        })}
    </TableColumn>
  );
};

const Table = ({ originalData, tableContainerWidth }) => {
  const [data, setData] = useState(
    originalData ? JSON.parse(JSON.stringify(originalData)) : []
  );

  return (
    <TableContainer $tableContainerWidth={tableContainerWidth}>
      {originalData &&
        originalData.length !== 0 &&
        Object.keys(originalData[0]).map((keyValue, index) => {
          if (Object.keys(originalData[0]).length - 1 != index)
            return (
              <TableColComponent
                key={index}
                key_value={keyValue}
                data={data}
                originalData={originalData}
                setData={setData}
              />
            );
          else
            return (
              <TableColComponent
                key={index}
                key_value={keyValue}
                data={data}
                last="1"
                originalData={originalData}
                setData={setData}
              />
            );
        })}

      {data.length === 0 && (
        <Wrapper>
          {" "}
          <TbFilterSearch className="noDataAvailabeIcon" />
          No Records
        </Wrapper>
      )}
    </TableContainer>
  );
};

export default Table;
