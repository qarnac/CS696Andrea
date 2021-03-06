/*
 * Author     : Andrea Tan
 * Date  	  : 29 Jan 2014
 * HW		  : 1
 * Description:  
 * 			
 */

package com.assignment.hw1andrea;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;


public class MainActivity extends Activity {

	
    /// <summary>
    /// function event handler for button Parse on click
    /// </summary>
    /// <param name="View"></param>
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
        
        Button btnParse = (Button) findViewById(R.id.buttonParse);
        btnParse.setOnClickListener(buttonParseHandler);

    }
    
    /// <summary>
    /// function event handler for button Parse on click
    /// </summary>
    /// <param name="View"></param>
    View.OnClickListener buttonParseHandler = new View.OnClickListener() {
        public void onClick(View v) {
          // it was the 1st button
	    	Intent intent = new Intent(v.getContext(), DisplayResultActivity.class);
	    	//get value for the input text
	    	EditText paragraphEditText   = (EditText)findViewById(R.id.paragraphInputText);
	    	
	    	if(!paragraphEditText.getText().toString().equals(""))
	    	{
	    		intent.putExtra("paragraphString", paragraphEditText.getText().toString());
	    		startActivityForResult(intent,0);
	    	}
        }
     };


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
	
    
    
}
