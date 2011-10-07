var ns_k_description = "";
var ns_k_keywords = "";
var ns_k_title = document.title;
var ns_k_url = document.location;
var metas=document.getElementsByTagName('head')[0].getElementsByTagName('meta'); 
for(var i=0,L=metas.length;i<L;i++){ 
	  if(metas[i].name.toLowerCase()=='description') ns_k_description=metas[i].content; 
	  if(metas[i].name.toLowerCase()=='keywords') ns_k_keywords=metas[i].content; 
} 

(function() {
  var klog = document.createElement("script"), el_klog = document.getElementsByTagName("script")[0]; klog.async = true;
  klog.src = "http://adv.netshelter.net/context_keywords/k_log.php?s="+ns_k_siteid+"&u="+escape(ns_k_url)+"&t="+escape(ns_k_title)+"&d="+escape(ns_k_description)+"&k="+escape(ns_k_keywords);
  el_klog.parentNode.insertBefore(klog, el_klog);
})();