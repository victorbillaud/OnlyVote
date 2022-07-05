package com.example.onlyvote.ui.vote

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.fragment.app.Fragment
import com.example.onlyvote.data.CandidateRequest
import com.example.onlyvote.databinding.FragmentVoteBinding
import com.google.gson.Gson
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL


/**
 * Vote page class
 */
class VoteFragment : Fragment() {

    private var _binding: FragmentVoteBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentVoteBinding.inflate(inflater, container, false)
        val root: View = binding.root

        fetchCandidateNames().start()

        binding.apply {
            buttonSave.setOnClickListener {
                val intent = Intent(activity, SendMessageActivity::class.java)
                intent.putExtra("candidate", spinnerCandidateNames.selectedItem.toString())
                intent.putExtra("idCandidate", spinnerIdCandidate.getItemAtPosition(spinnerCandidateNames.selectedItemPosition).toString())
                startActivity(intent)
            }
        }

        return root
    }

    /**
     * Fetch all candidate names from api
     */
    private fun fetchCandidateNames() : Thread {
        return Thread {
            val url = URL("https://onlyvote.victorbillaud.fr/candidat")
            val connection = url.openConnection() as HttpURLConnection
            val inputSystem = connection.inputStream
            val inputStreamReader = InputStreamReader(inputSystem, "UTF-8")
            val request: Array<CandidateRequest> = Gson().fromJson(inputStreamReader, Array<CandidateRequest>::class.java)

            updateUiCandidateNamesSpinner(request)

            inputStreamReader.close()
            inputSystem.close()
        }
    }

    /**
     * Update the UI on fetching candidate names
     * @param request
     */
    private fun updateUiCandidateNamesSpinner(request: Array<CandidateRequest>) {
        requireActivity().runOnUiThread {
            kotlin.run {
                val names: ArrayList<String> = ArrayList()
                val ids: ArrayList<Int> = ArrayList()

                for (i in request.indices) {
                    names.add(request.get(i).firstname + " " + request.get(i).lastname)
                    ids.add(request.get(i).id)
                }

                val adapter: ArrayAdapter<String> = ArrayAdapter(binding.root.context, android.R.layout.simple_list_item_1, names)

                binding.spinnerCandidateNames.adapter = adapter

                val adapterId: ArrayAdapter<Int> = ArrayAdapter(binding.root.context, android.R.layout.simple_list_item_1, ids)

                binding.spinnerIdCandidate.adapter = adapterId
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}