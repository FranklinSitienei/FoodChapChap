import React, { useState, useEffect } from 'react';
import './BlogRightSide.css';

const BlogRightSide = () => {
    const [popularBlogs, setPopularBlogs] = useState([]);

    useEffect(() => {
        fetch('/blogs')
            .then(response => response.json())
            .then(blogs => {
                // Sort blogs by likes in descending order
                const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes).slice(0, 10);
                setPopularBlogs(sortedBlogs);
            })
            .catch(error => console.error('Error fetching popular blogs:', error));
    }, []);

    return (
        <aside className="page-sidebar right col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <div className="widget-holder">
                <div className="widget widget_search">
                    <div className="widget-title">
                        <h5>Search</h5>
                    </div>
                    <form action="#" method="get" className="form-inline">
                        <fieldset>
                            <div className="input-group">
                                <input type="text" name="s" id="search" placeholder="Search" value="" className="form-control" />
                                <span className="input-group-btn">
                                    <button type="submit" className="btn btn-default"><i className="icon-search"></i></button>
                                </span>
                            </div>
                        </fieldset>
                    </form>
                </div>

                <div className="widget widget_recent_entries">
                    <div className="widget-title">
                        <h5>Popular Blogs</h5>
                    </div>
                    <ul>
                        {popularBlogs.map(blog => (
                            <li key={blog.id} className="flex items-center gap-4 py-2 border-b border-gray-200">
                                <img src={blog.image_url} alt={blog.title} className="image" style={{
                                    width: '50px',
                                }} />
                                <div>
                                    <a href={`/blogs/${blog.id}`} className="hover:text-red-500">{blog.title}</a>
                                    <div className="flex items-center">
                                        <span className="text-gray-500">{blog.likes} Likes</span>
                                        <i className="ml-2 text-red-500 fas fa-heart"></i>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
}

export default BlogRightSide;
