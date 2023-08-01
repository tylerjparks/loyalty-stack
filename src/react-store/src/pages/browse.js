import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import "../../src/css/main.css";

// Browse page

const Browse = () => {
  // set useState to retrieve data from the API
  const [data, setData] = useState([]);
  const [brand, setBrand] = useState([]);
  const [system, setSytems] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [searchTermValue, setSearchTermValue] = useState("");

  // fetch function to retrieve game cards into the browse
  const fetchData = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "/api/products", {
      mode: "cors",
      method: "GET",
    })
      .then((res) => res.json())
      .then((gameData) => {
        setData(gameData);
        setRecommendations(gameData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // fetch function to retrieve options for dropdown filters
  const fetchBrands = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "/api/brands", {
      mode: "cors",
      method: "GET",
    })
      .then((res) => res.json())
      .then((gameBrands) => {
        setBrand(gameBrands);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const fetchSystems = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "/api/productlevels", {
      mode: "cors",
      method: "GET",
    })
      .then((res) => res.json())
      .then((gameSystems) => {
        setSytems(gameSystems);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // populate state
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchBrands();
  }, []);
  useEffect(() => {
    fetchSystems();
  }, []);

  const allFiltersActive = (system, genre, brand) => {
    fetch(
      process.env.REACT_APP_API_ENDPOINT + `/api/products?System=${system}&Genre=${genre}&Brand=${brand}`,
      {
        mode: "cors",
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((filterData) => {
        setData(filterData);
      });
  };

  const systemBrandFilterActive = (system, brand) => {
    fetch(
      process.env.REACT_APP_API_ENDPOINT + `/api/products?System=${system}&Brand=${brand}`,
      {
        mode: "cors",
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((filterData) => {
        setData(filterData);
      });
  };

  const systemGenreFilterActive = (system, genre) => {
    fetch(
      process.env.REACT_APP_API_ENDPOINT + `/api/products?System=${system}&Genre=${genre}`,
      {
        mode: "cors",
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((filterData) => {
        setData(filterData);
      });
  };

  const genreBrandFilterActive = (genre, brand) => {
    fetch(process.env.REACT_APP_API_ENDPOINT + `/api/products?Genre=${genre}&Brand=${brand}`, {
      mode: "cors",
      method: "GET",
    })
      .then((res) => res.json())
      .then((filterData) => {
        setData(filterData);
      });
  };

  const systemFilterOnly = (system) => {
    fetch(process.env.REACT_APP_API_ENDPOINT + `/api/products?System=${system}`, {
      mode: "cors",
      method: "GET",
    })
      .then((res) => res.json())
      .then((filterData) => {
        setData(filterData);
      });
  };

  const genreFilterOnly = (genre) => {
    fetch(process.env.REACT_APP_API_ENDPOINT + `/api/products?Genre=${genre}`, {
      mode: "cors",
      method: "GET",
    })
      .then((res) => res.json())
      .then((filterData) => {
        setData(filterData);
      });
  };

  const brandFilterOnly = (brand) => {
    fetch(process.env.REACT_APP_API_ENDPOINT + `/api/products?Brand=${brand}`, {
      mode: "cors",
      method: "GET",
    })
      .then((res) => res.json())
      .then((filterData) => {
        setData(filterData);
      });
  };
  const noFilterActive = () => {
    fetchData();
  };

  const handleChangeSystem = (e) => {
    // get the values of the dropdowns
    const systemFilter = document.getElementById("system-filter").value;
    const genreFilter = document.getElementById("genre-filter").value;
    const brandFilter = document.getElementById("brand-filter").value;
    let brandFilterValue;

    // change value of brand filter dropdown to get a response from the API
    if (brandFilter === "Activision") {
      brandFilterValue = "ACTI";
    } else if (brandFilter === "Parker Brothers") {
      brandFilterValue = "PBRO";
    } else if (brandFilter === "Imagic") {
      brandFilterValue = "IMAG";
    } else if (brandFilter === "M-Network") {
      brandFilterValue = "MNET";
    } else {
      brandFilterValue = brandFilter;
    }
    if (
      systemFilter !== "start-here" &&
      genreFilter !== "start-here" &&
      brandFilter !== "start-here"
    ) {
      // when all dropdowns are active
      allFiltersActive(
        systemFilter.slice(-4),
        genreFilter,
        brandFilterValue.toUpperCase()
      );
    } else if (
      systemFilter !== "start-here" &&
      genreFilter !== "start-here" &&
      brandFilter === "start-here"
    ) {
      systemGenreFilterActive(systemFilter.slice(-4), genreFilter);
    } else if (
      systemFilter !== "start-here" &&
      genreFilter === "start-here" &&
      brandFilter !== "start-here"
    ) {
      systemBrandFilterActive(
        systemFilter.slice(-4),
        brandFilterValue.toUpperCase()
      );
    } else if (
      systemFilter !== "start-here" &&
      genreFilter === "start-here" &&
      brandFilter === "start-here"
    ) {
      systemFilterOnly(systemFilter.slice(-4));
    } else {
      // handle cases for when the system dropdown is set back to its default value
      if (
        systemFilter === "start-here" &&
        genreFilter === "start-here" &&
        brandFilter === "start-here"
      ) {
        noFilterActive();
      } else if (
        systemFilter === "start-here" &&
        genreFilter !== "start-here" &&
        brandFilter !== "start-here"
      ) {
        genreBrandFilterActive(genreFilter, brandFilterValue.toUpperCase());
      } else if (
        systemFilter === "start-here" &&
        genreFilter !== "start-here" &&
        brandFilter === "start-here"
      ) {
        genreFilterOnly(genreFilter);
      } else if (
        systemFilter === "start-here" &&
        genreFilter === "start-here" &&
        brandFilter !== "start-here"
      ) {
        brandFilterOnly(brandFilterValue.toUpperCase());
      }
    }
  };

  const handleChangeGenre = (e) => {
    // get the values of the dropdowns
    const systemFilter = document.getElementById("system-filter").value;
    const genreFilter = document.getElementById("genre-filter").value;
    const brandFilter = document.getElementById("brand-filter").value;
    let brandFilterValue;
    // when all dropdowns are active
    if (brandFilter === "Activision") {
      brandFilterValue = "ACTI";
    } else if (brandFilter === "Parker Brothers") {
      brandFilterValue = "PBRO";
    } else if (brandFilter === "Imagic") {
      brandFilterValue = "IMAG";
    } else if (brandFilter === "M-Network") {
      brandFilterValue = "MNET";
    } else {
      brandFilterValue = brandFilter;
    }
    if (
      genreFilter !== "start-here" &&
      systemFilter !== "start-here" &&
      brandFilter !== "start-here"
    ) {
      allFiltersActive(
        systemFilter.slice(-4),
        genreFilter,
        brandFilterValue.toUpperCase()
      );
    } else if (
      genreFilter !== "start-here" &&
      systemFilter !== "start-here" &&
      brandFilter === "start-here"
    ) {
      systemGenreFilterActive(systemFilter.slice(-4), genreFilter);
    } else if (
      genreFilter !== "start-here" &&
      systemFilter === "start-here" &&
      brandFilter !== "start-here"
    ) {
      genreBrandFilterActive(genreFilter, brandFilterValue.toUpperCase());
    } else if (
      genreFilter !== "start-here" &&
      systemFilter === "start-here" &&
      brandFilter === "start-here"
    ) {
      genreFilterOnly(genreFilter);
    } else {
      if (
        genreFilter === "start-here" &&
        systemFilter === "start-here" &&
        brandFilter === "start-here"
      ) {
        noFilterActive();
      } else if (
        genreFilter === "start-here" &&
        systemFilter !== "start-here" &&
        brandFilter !== "start-here"
      ) {
        systemBrandFilterActive(
          systemFilter.slice(-4),
          brandFilterValue.toUpperCase()
        );
      } else if (
        genreFilter === "start-here" &&
        systemFilter === "start-here" &&
        brandFilter !== "start-here"
      ) {
        brandFilterOnly(brandFilterValue.toUpperCase());
      } else if (
        genreFilter === "start-here" &&
        systemFilter !== "start-here" &&
        brandFilter === "start-here"
      ) {
        systemFilterOnly(systemFilter.slice(-4));
      }
    }
  };
  const handleChangeBrand = (e) => {
    // get the values of the dropdowns
    const systemFilter = document.getElementById("system-filter").value;
    const genreFilter = document.getElementById("genre-filter").value;
    const brandFilter = document.getElementById("brand-filter").value;
    let brandFilterValue;
    // when all dropdowns are active
    if (brandFilter === "Activision") {
      brandFilterValue = "ACTI";
    } else if (brandFilter === "Parker Brothers") {
      brandFilterValue = "PBRO";
    } else if (brandFilter === "Imagic") {
      brandFilterValue = "IMAG";
    } else if (brandFilter === "M-Network") {
      brandFilterValue = "MNET";
    } else {
      brandFilterValue = brandFilter;
    }

    if (
      systemFilter !== "start-here" &&
      genreFilter !== "start-here" &&
      brandFilter !== "start-here"
    ) {
      // when all dropdowns are active
      allFiltersActive(
        systemFilter.slice(-4),
        genreFilter,
        brandFilterValue.toUpperCase()
      );
    } else if (
      brandFilter !== "start-here" &&
      systemFilter !== "start-here" &&
      genreFilter === "start-here"
    ) {
      systemBrandFilterActive(
        systemFilter.slice(-4),
        brandFilterValue.toUpperCase()
      );
    } else if (
      brandFilter !== "start-here" &&
      systemFilter === "start-here" &&
      genreFilter !== "start-here"
    ) {
      genreBrandFilterActive(genreFilter, brandFilterValue.toUpperCase());
    } else if (
      brandFilter !== "start-here" &&
      systemFilter === "start-here" &&
      genreFilter === "start-here"
    ) {
      brandFilterOnly(brandFilterValue.toUpperCase());
    } else {
      if (
        genreFilter === "start-here" &&
        systemFilter === "start-here" &&
        brandFilter === "start-here"
      ) {
        noFilterActive();
      } else if (
        brandFilter === "start-here" &&
        genreFilter !== "start-here" &&
        systemFilter !== "start-here"
      ) {
        systemGenreFilterActive(systemFilter.slice(-4), genreFilter);
      } else if (
        brandFilter === "start-here" &&
        genreFilter !== "start-here" &&
        systemFilter === "start-here"
      ) {
        genreFilterOnly(genreFilter);
      } else if (
        brandFilter === "start-here" &&
        genreFilter === "start-here" &&
        systemFilter !== "start-here"
      ) {
        systemFilterOnly(systemFilter.slice(-4));
      }
    }
  };

  const handleClickReset = (e) => {
    e.stopPropagation();
    document.getElementById("system-filter").value = "start-here";
    document.getElementById("genre-filter").value = "start-here";
    document.getElementById("brand-filter").value = "start-here";
    noFilterActive();
  };

  const handleResetSearch = (e) => {
    e.stopPropagation();
    if (document.getElementById("search-input").value === "") {
      noFilterActive();
    }
  };

  const handleSearch = (e) => {
    const value = searchTermValue;
    console.log("value: ", value);
    const code = e.keycode ? e.keycode : e.which;
    if (code === 13) {
      fetch(process.env.REACT_APP_API_ENDPOINT + `/api/productsearch?name=${value}`, {
        mode: "cors",
        method: "GET",
      })
        .then((res) => res.json())
        .then((gameData) => {
          setData(gameData);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleSearchClick = (e) => {
    const value = searchTermValue;
    console.log("value: ", value);
    fetch(process.env.REACT_APP_API_ENDPOINT + `/api/productsearch?name=${value}`, {
      mode: "cors",
      method: "GET",
    })
      .then((res) => res.json())
      .then((gameData) => {
        setData(gameData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSearchRecommendation = (value) => {
    setSearchTermValue(value);
    document.getElementById("search-input").value = value;
    fetch(process.env.REACT_APP_API_ENDPOINT + `/api/productsearch?name=${value}`, {
      mode: "cors",
      method: "GET",
    })
      .then((res) => res.json())
      .then((gameData) => {
        setData(gameData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="browse-page-header">
        <h1>Browse Items Here!</h1>
      </div>
      <div className="filter-container">
        <div className="select dropdown">
          <select id="system-filter" onChange={handleChangeSystem}>
            {/* SHOW SYSTEM OPTIONS DROPDOWN */}
            <option value="start-here">Filter by System</option>
            {system.map((_system) => {
              if (_system.hierarchyLevel === 1) {
                return (
                  <option className="option" value={_system.levelCode}>
                    {_system.levelCode}
                  </option>
                );
              }
            })}
          </select>
        </div>
        <div className="select dropdown">
          <select id="genre-filter" onChange={handleChangeGenre}>
            {/* SHOW SYSTEM OPTIONS DROPDOWN */}
            <option value="start-here">Filter by Genre</option>
            {/* SHOW GENRE OPTIONS DROPDOWN */}
            {system.map((_system) => {
              if (_system.hierarchyLevel === 2) {
                return (
                  <option value={_system.levelCode}>{_system.levelCode}</option>
                );
              }
            })}
          </select>
        </div>
        <div className="select dropdown">
          <select id="brand-filter" onChange={handleChangeBrand}>
            {/* SHOW BRAND OPTIONS DROPDOWN */}
            <option value="start-here">Filter by Brand</option>
            {brand.map((_brand) => {
              return (
                <option value={_brand.description} className="option">
                  {_brand.description}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="button is-black"
          style={{ backgroundColor: "#7b1fa2" }}
          onClick={handleClickReset}
        >
          Reset All Filter
        </button>
        <div className="field has-addons search-bar">
          <div className="control">
            <input
              id="search-input"
              className="input"
              type="search"
              placeholder="Find a game"
              onKeyUp={handleSearch}
              onBlur={handleResetSearch}
              onChange={(e) => {
                setSearchTermValue(e.currentTarget.value);
              }}
            />
            <div id="recommendations" className="dropdown-recommendations">
              {recommendations
                .filter((item) => {
                  const searchTerm = document
                    .getElementById("search-input")
                    .value.toLowerCase();
                  const gameName = item.name.toLowerCase();
                  return (
                    searchTerm &&
                    gameName.includes(searchTerm) &&
                    gameName !== searchTerm
                  );
                })
                .slice(0, 6)
                .map((recommendation) => {
                  return (
                    <div
                      key={recommendation.id}
                      onClick={() => {
                        handleSearchRecommendation(recommendation.name);
                      }}
                      className="dropdown-recommendations-row"
                    >
                      {recommendation.name}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="control" onClick={handleSearchClick}>
            <a
              className="button is-info"
              style={{ backgroundColor: "#7b1fa2" }}
            >
              Search
            </a>
          </div>
        </div>
      </div>
      <div className="games-container">
        {data.map((game) => {
          // render all the game cards
          return (
            <Link
              to={"/game"}
              state={{
                game,
              }}
            >
              <div
                id={game.id}
                className="column is-3 "
                style={{
                  display: "inline-block",
                }}
              >
                <GameCard
                  title={game.name}
                  price={game.unitPrice}
                  image={game.imageUrl}
                  description={game.description}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Browse;
