import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import dataService from '../services/dataService';
import authService from '../services/authService';
import componentService from '../services/componentService';

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
        console.log(id);
        navigate('/profile/' + id);
    }

    const showPost = (id) => {
        console.log('%c user attempted to go to post view page:' + id, 'color:blue');
        navigate('/postdetails/' + id); // this will be for when post-page is made
    }

    const tagSearchBarChanged = () => {
        let searchBar = document.getElementById("searchBar");
        let searchBarValue = searchBar.value;
        //let tagBarRaw = event.target.value;

        //this gurantees that the searched tags bar always starts with a #.
        //its not neccesary but makes it look nicer.
        if(searchBarValue[0] != '#')
            searchBarValue = '#'+searchBarValue;

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

        searchBar.value = searchBar.value.replace('#'+tagToRemove, "");

        tagSearchBarChanged();
    }


    const tagClicked = (tag) => {
        let searchBar = document.getElementById("searchBar");

        if(searchBar.value.includes("#"+tag)){
            removeTagFromSearchBar(tag)
        } else {
            addTagToSearchBar(tag)
        }
    }

    const addTagToSearchBar = (newTag) => {
        //console.log('clicky');
        let searchBar = document.getElementById("searchBar");


        searchBar.value += "#"+newTag;

        tagSearchBarChanged();
    }


    const testerBoy = () => {
        //console.log(componentService.grabMyUserDetails().userId)
        componentService.MostCommonTagsForUser("63f414487cf34484cee0fda8", 4, (t => {
            console.log(t);
        })); //john

        componentService.MostCommonTagsForAllUsers(6, (t => {
            console.log(t);
        })); //all


        //componentService.MostCommonTagsForUser("641de21868df47fa8d5f1a05"); //joy
    }


    // const splitTagBar = (rawTags) => {
    //     return rawTags.match(/((?<=#)|^)[a-z|A-Z]+/g)
    // }

    //takes an array of post
    //example ["bike","fix","ect"]
    const getPostsWithRelevantTags = () => {
        //console.log("p");

        if(searchedTags.length > 0){
            return posts.filter((post) => {      
                if(post.tags.some(tag => searchedTags.indexOf(tag.title) >= 0)){
                    
                    return post;
                }
            })
        }
        else {
            return posts.filter((post) => post);
        }
    }


    return (
        <div class="container">
            {/* <h1>Home.</h1> */}
            {/* Search bar */}
            <div class="input-group rounded">
                <input type="search" id="searchBar" class="form-control rounded" onChange={tagSearchBarChanged} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <span class="input-group-text border-0" id="search-addon">
                    <i class="fas fa-search"></i>
                </span>
            </div>

            <button type="button" onClick={() => navigate('/postcreate')} className="btn btn-sm btn-outline-primary">Write a Post</button>
            <button type="button" onClick={() => testerBoy()} className="btn btn-sm btn-outline-secondary">test Button</button>

            {/* Post Container */}
            <div class="container">
                <div class="col-md-12 col-lg-12">
                    {
                        //console.log(getPostsWithRelevantTags())
                    }
                    {
                        //console.log(getPostsWithRelevantTags());
                        getPostsWithRelevantTags().map((tp, i) => {
                            //console.log('post');
                            return <Post key={i} data={tp} 
                                goToProfile={goToProfile} 
                                showPost={showPost} 
                                tagClicked={tagClicked}
                            />
                            //return <Post/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home