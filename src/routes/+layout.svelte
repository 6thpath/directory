<script lang="ts">
  import '../app.css'
  let { children } = $props()
</script>

<sp-theme system="spectrum-two" color="dark" scale="medium">
  {@render children()}
</sp-theme>
