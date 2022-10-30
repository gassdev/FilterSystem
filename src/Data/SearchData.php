<?php

namespace App\Data;

use App\Entity\Category;

class SearchData
{
        
    /**
     * q
     *
     * @var string
     */
    public $q = '';
    
    /**
     * categories
     *
     * @var Category[]
     */
    public $categories = [];
    
    /**
     * max
     *
     * @var null|integer
     */
    public $max;
    
    /**
     * min
     *
     * @var null|integer
     */
    public $min;

    /**
     * @var boolean
     */
    public $promo = false;
}