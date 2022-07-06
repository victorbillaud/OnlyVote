package com.example.onlyvote.ui.candidates

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.onlyvote.data.CandidateRequest
import com.example.onlyvote.databinding.FragmentCandidatesBinding
import com.google.gson.Gson
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL

/**
 * Candidate page class
 */
class CandidatesFragment : Fragment() {

    private var _binding: FragmentCandidatesBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    private val viewPagerItemArrayList: ArrayList<ViewPagerItem> = ArrayList()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCandidatesBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.apply {
            fetchCandidateData().start()
        }

        return root
    }

    /**
     * Fetch all candidate informations from api
     */
    private fun fetchCandidateData() : Thread {
        return Thread {
            val url = URL("https://onlyvote.victorbillaud.fr/candidat")
            val connection = url.openConnection() as HttpURLConnection
            val inputSystem = connection.inputStream
            val inputStreamReader = InputStreamReader(inputSystem, "UTF-8")
            val request: Array<CandidateRequest> = Gson().fromJson(inputStreamReader, Array<CandidateRequest>::class.java)

            updateUiViewPager(request)

            inputStreamReader.close()
            inputSystem.close()
        }
    }

    /**
     * Update the UI on fetching candidate informations
     * @param request
     */
    private fun updateUiViewPager(request: Array<CandidateRequest>) {
        requireActivity().runOnUiThread {
            kotlin.run {
                val names: ArrayList<String> = ArrayList()
                val parties: ArrayList<String> = ArrayList()
                val programs: ArrayList<String> = ArrayList()
                val profiles: ArrayList<String> = ArrayList()

                for (i in request.indices) {
                    names.add(request.get(i).firstname + " " + request.get(i).lastname)
                    parties.add(request.get(i).party)
                    programs.add(request.get(i).program)
                    profiles.add(request.get(i).profilePicture)
                }

                for (i in names.indices) {
                    val viewPagerItem = ViewPagerItem(names.get(i), parties.get(i), programs.get(i), profiles.get(i))

                    viewPagerItemArrayList.add(viewPagerItem)
                }

                viewPagerItemArrayList.shuffle()

                val vpAdapter = VPAdapter(viewPagerItemArrayList)

                binding.viewPager2.adapter = vpAdapter

                binding.indicator.setViewPager(binding.viewPager2)

                binding.viewPager2.clipToPadding = false
                binding.viewPager2.clipChildren = false
                binding.viewPager2.offscreenPageLimit = 2
                binding.viewPager2.getChildAt(0).overScrollMode = View.OVER_SCROLL_NEVER
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}