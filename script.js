<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getDatabase, ref, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCE3dTFL6SXhJn9m4g25slrnSRxZzVGZX4",
  authDomain: "smhe-poll.firebaseapp.com",
  projectId: "smhe-poll",
  storageBucket: "smhe-poll.firebasestorage.app",
  messagingSenderId: "786119070457",
  appId: "1:786119070457:web:17136f28ef243c1fe4c828"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const options = ["AI", "Robotics", "Telemedicine", "Genomics"];
const pollRef = ref(db, "poll1");

window.vote = function (index) {
  const optionRef = ref(db, `poll1/${index}`);
  runTransaction(optionRef, (current) => (current || 0) + 1);
};

onValue(pollRef, (snapshot) => {
  const votes = snapshot.val() || [0, 0, 0, 0];
  renderResults(votes);
});

function renderResults(votes) {
  const total = votes.reduce((a, b) => a + b, 0);
  let html = "";

  options.forEach((opt, i) => {
    const percent = total ? Math.round((votes[i] / total) * 100) : 0;
    html += `
      <div class="bar" style="width:${percent}%">
        ${opt}: ${votes[i]} (${percent}%)
      </div>`;
  });

  document.getElementById("results").innerHTML = html;
}
</script>
