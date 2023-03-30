import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import dataService from '../services/dataService';
import authService from '../services/authService';
import componentService from '../services/componentService';
import '../css/app.css';

const no_image = require('../img/no_image.png');
const tempPosts = require('../pseudodata_posts.json')

//console.log('\x1b[\x1b[36m user attempted to go to profile:'+id+']]')
//console.log('%c user attempted to go to profile:'+id,'color:blue');

const Home = (props) => {

    const [searchedTags, setSearchedTags] = useState([])
    const [posts, setPosts] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        dataService.getPosts(posts => {

            //convert the tag ids into names
            //dataService.getTagsById();

            setPosts(posts);
        })
    }, [])

    const goToProfile = (id) => {
        console.log('%c user attempted to go to profile:' + id, 'color:blue');
        navigate('/profile/' + id);
    }

    // const showPost = (id) => {
    //     console.log('%c user attempted to go to post view page:' + id, 'color:blue');
    //     navigate('/postdetails/' + id); // this will be for when post-page is made
    // }

    const tagSearchBarChanged = () => {
        let searchBar = document.getElementById("searchBar");
        let searchBarValue = searchBar.value;
        //let tagBarRaw = event.target.value;

        //this gurantees that the searched tags bar always starts with a #.
        //its not neccesary but makes it look nicer.
        if (searchBarValue[0] != '#')
            searchBarValue = '#' + searchBarValue;

        //this uses regex to limit the search bar to only having one # in a row.
        searchBarValue = searchBarValue.replace(/##+/g, "#");

        //this uses regex to limit the search bar to only alphanumeric and # symbols.
        searchBarValue = searchBarValue.replace(/(?=\W)([^#])/g, "");


        //this uses regex to split the raw string into seperate strings that start with #
        //and populate a new array with the new strings.
        //if no matches (and therefore returns undefined) it defaults to an empty array.
        let splitTags = searchBarValue.match(/((?<=#)|^)[a-z|A-Z]+/g) ?? [];

        searchBar.value = searchBarValue;
        setSearchedTags(splitTags);
    }

    const removeTagFromSearchBar = (tagToRemove) => {
        //console.log('removey');
        let searchBar = document.getElementById("searchBar");

        searchBar.value = searchBar.value.replace('#' + tagToRemove, "");

        tagSearchBarChanged();
    }


    const tagClicked = (tag) => {
        let searchBar = document.getElementById("searchBar");

        if (searchBar.value.includes("#" + tag)) {
            removeTagFromSearchBar(tag)
        } else {
            addTagToSearchBar(tag)
        }
    }

    const addTagToSearchBar = (newTag) => {
        //console.log('clicky');
        let searchBar = document.getElementById("searchBar");


        searchBar.value += "#" + newTag;

        tagSearchBarChanged();
    }


    const testerBoy = () => {
        //console.log(componentService.grabMyUserDetails().userId)
    }


    // const splitTagBar = (rawTags) => {
    //     return rawTags.match(/((?<=#)|^)[a-z|A-Z]+/g)
    // }

    //takes an array of post
    //example ["bike","fix","ect"]
    const getPostsWithRelevantTags = () => {
        //console.log("p");

        if (searchedTags.length > 0) {
            return posts.filter((post) => {
                if (post.tags.some(tag => searchedTags.indexOf(tag.title) >= 0)) {

                    return post;
                }
            })
        }
        else {
            return posts.filter((post) => post);
        }
    }


    return (
        <div class="container home">

            {/* Search bar */}
            <div class="p-1 bg-light rounded rounded-pill mt-5 mb-5 searchbar shadow-sm mb-4 mx-auto">
                <div class="input-group">
                    <input type="search" id="searchBar" class="form-control border-0 bg-light" onChange={tagSearchBarChanged} placeholder="Search for a post or tag here" aria-label="Search" aria-describedby="search-addon" />
                    <div class="input-group-append">
                        <button id="button-addon1" type="submit" class="btn btn-link searchIcon"><i class="fa fa-search"></i></button>
                    </div>
                </div>
            </div>

            {/* Post Container */}
            <div class="container mt-5">
                <div class="col-md-12 col-lg-12">
                    <div className="ml-5 w-50">
                        <button type="button" onClick={() => navigate('/postcreate')} className="btn btn-primary rounded-pill mb-4 createButton shadow-sm"><i className="fa-solid fa-plus"></i> Write a Post</button>
                    </div>
                </div>

                {/* Post Container */}
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        {
                            getPostsWithRelevantTags().map((tp, i) => {
                                console.log('post');
                                return <Post key={i} data={tp}
                                    goToProfile={goToProfile}
                                    // showPost={showPost} 
                                    tagClicked={tagClicked}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Home