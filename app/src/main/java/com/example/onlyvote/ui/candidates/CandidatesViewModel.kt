package com.example.onlyvote.ui.candidates

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class CandidatesViewModel : ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "This is candidates Fragment"
    }
    val text: LiveData<String> = _text
}