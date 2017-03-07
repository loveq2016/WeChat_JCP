import util from 'util.js';
/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _get( url, success, fail ) {
    wx.request( {
        url: url,
        header: {
            // 'Content-Type': 'application/json'
        },
        success: function( res ) {
            success( res );
        },
        fail: function( res ) {
            fail( res );
        }
    });

}

/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _post_from(url,data, success, fail ) {
     wx.request( {
        url: url,
        header: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        method:'POST',
        data:{data: data},
        success: function( res ) {
            success( res );
        },
        fail: function( res ) {
            fail( res );
        }
    });
}

 /**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _post_json(url,data, success, fail ) {
    wx.request( {
        url: url,
        header: {
            'content-type': 'application/json',
        },
        method:'POST',
        data:data,
        success: function( res ) {
            success( res );
        },
        fail: function( res ) {
            fail( res );
        }
    });

}
module.exports = {
    _get: _get,
    _post_from:_post_from,
    _post_json:_post_json
}