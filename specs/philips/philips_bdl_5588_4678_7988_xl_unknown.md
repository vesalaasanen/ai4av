---
spec_id: admin/philips-bdl-5588-4678-7988-xl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips BDL 5588 4678 7988 XL Control Spec"
manufacturer: Philips
model_family: "BDL 5588 4678 7988 XL"
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - "BDL 5588 4678 7988 XL"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.westan.com.au
  - community.xibo.org.uk
  - agneovo.com
  - applicationmarket.crestron.com
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.agneovo.com/wp-content/uploads/2021/07/PM-32_RS232_CommandList1.pdf
  - "https://applicationmarket.crestron.com/content/Help/Philips/Philips%20Signage%20Displays%20RS232%20v1.0%20Help.pdf"
  - https://support.westan.com.au/portal/en-gb/kb/https-support-westan-com-au-portal-kb-philips-tv-and-signage/philips-bdl-bfl-digital-sigange/sicp-protocol-serial-interface-communication-protocol
retrieved_at: 2026-07-25T09:25:54.438Z
last_checked_at: 2026-08-05T08:36:40.471Z
generated_at: 2026-08-05T08:36:40.471Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no query/feedback responses documented in source; no safety/interlock info; no firmware version info; model variants (5588/4678/7988) share one SICP table but individual SKU differences not enumerated."
  - "no query responses or unsolicited feedback strings documented in source"
  - "no settable parameter discovery documented in source"
  - "no unsolicited notification documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "command acknowledgement/response format not documented."
  - "byte-level framing (start/stop bytes, checksum algorithm) not documented — payloads appear to include a trailing checksum byte but algorithm not stated."
  - "per-SKU differences across 5588/4678/7988 not enumerated."
  - "full SICP v1.99 command set likely larger than this excerpt; source is a \"Commonly Used Protocol\" subset."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:36:40.471Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 spec hex commands match the refined SICP table verbatim, transport values agree with source, source has no extra commands beyond the spec's set. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Philips BDL 5588 4678 7988 XL Control Spec

## Summary
Philips BDL 5588/4678/7988 XL professional display, controlled via the SICP (Smart Install Command Protocol) v1.99 command set over RS-232 serial or TCP/IP. Source documents power, input selection, volume, mute, and tiling commands as hex payloads.

<!-- UNRESOLVED: no query/feedback responses documented in source; no safety/interlock info; no firmware version info; model variants (5588/4678/7988) share one SICP table but individual SKU differences not enumerated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # exception: 75BDL3151T uses 115200 (not in this family)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 5000  # default TCP port for models supporting SICP over IP
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off commands
  - routable     # inferred from input selection commands
  - levelable    # inferred from volume set/up/down commands
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "06 00 00 18 02 1C"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "06 00 00 18 01 1F"
    params: []

  - id: input_hdmi
    label: Input HDMI
    kind: action
    command: "09 00 00 AC 0D 00 01 00 A9"
    params: []

  - id: input_hdmi2
    label: Input HDMI2
    kind: action
    command: "09 00 00 AC 06 00 01 00 A2"
    params: []

  - id: input_hdmi3
    label: Input HDMI3
    kind: action
    command: "09 00 00 AC 0F 00 01 00 AB"
    params: []

  - id: input_hdmi4
    label: Input HDMI4
    kind: action
    command: "09 00 00 AC 19 00 01 00 BD"
    params: []

  - id: input_vga
    label: Input VGA
    kind: action
    command: "09 00 00 AC 05 00 01 00 A1"
    params: []

  - id: input_dvi_d
    label: Input DVI-D
    kind: action
    command: "09 00 00 AC 0E 00 01 00 AA"
    params: []

  - id: input_usb
    label: Input USB
    kind: action
    command: "09 00 00 AC 0C 00 01 00 A8"
    params: []

  - id: input_custom
    label: Input Custom
    kind: action
    command: "09 00 00 AC 18 00 01 00 BC"
    params: []

  - id: volume_speaker_up
    label: Volume (speaker and audio out) Up
    kind: action
    command: "07 00 00 41 01 01 46"
    params: []

  - id: volume_speaker_down
    label: Volume (speaker and audio out) Down
    kind: action
    command: "07 00 00 41 00 00 46"
    params: []

  - id: volume_audio_out_up
    label: Volume (audio out) Up
    kind: action
    command: "07 00 00 41 02 01 45"
    params: []

  - id: volume_audio_out_down
    label: Volume (audio out) Down
    kind: action
    command: "07 00 00 41 02 00 44"
    params: []

  - id: volume_mute
    label: Volume Mute
    kind: action
    command: "06 00 00 47 01 40"
    params: []

  - id: volume_unmute
    label: Volume Unmute
    kind: action
    command: "06 00 00 47 00 41"
    params: []

  - id: volume_set
    label: Volume Set
    kind: action
    command: "07 00 00 44 {level_byte} {level_byte} 43"
    params:
      - name: level
        type: integer
        description: "Volume level 0-100 in decimal steps. Encoded as the level value in hex (0=00, 10=0A, 20=14, 30=1E, 40=28, 50=32, 60=3C, 70=46, 80=50, 90=5A, 100=64). Most models cap at max Volume 60."

  - id: enable_tiling
    label: Enable Tiling
    kind: action
    command: "09 00 00 22 01 02 00 00 1C"
    params: []

  - id: disable_tiling
    label: Disable Tiling
    kind: action
    command: "09 00 00 22 00 02 00 00 1D"
    params: []
```

## Feedbacks
```yaml
# UNRESOLVED: no query responses or unsolicited feedback strings documented in source
feedbacks: []
```

## Variables
```yaml
# UNRESOLVED: no settable parameter discovery documented in source
variables: []
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification documented in source
events: []
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# documented in source. Never inferred.
```

## Notes
- SICP version documented: v1.99 (source titled "V 1.89 onwards").
- All commands are raw hex byte sequences; framing/ack behaviour not documented.
- Volume set byte encoding: level N (decimal) → hex N (e.g. 50 → 0x32); byte appears twice in payload.
- Source notes "Most models only have max Volume 60" — caller should respect per-model cap.
- Serial config exception noted for an unrelated model (75BDL3151T at 115200 baud); does not apply to BDL 5588/4678/7988 XL family.
- TCP control only available on models supporting SICP over IP; per-model support not enumerated in source.

<!-- UNRESOLVED: command acknowledgement/response format not documented. -->
<!-- UNRESOLVED: byte-level framing (start/stop bytes, checksum algorithm) not documented — payloads appear to include a trailing checksum byte but algorithm not stated. -->
<!-- UNRESOLVED: per-SKU differences across 5588/4678/7988 not enumerated. -->
<!-- UNRESOLVED: full SICP v1.99 command set likely larger than this excerpt; source is a "Commonly Used Protocol" subset. -->

## Provenance

```yaml
source_domains:
  - support.westan.com.au
  - community.xibo.org.uk
  - agneovo.com
  - applicationmarket.crestron.com
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.agneovo.com/wp-content/uploads/2021/07/PM-32_RS232_CommandList1.pdf
  - "https://applicationmarket.crestron.com/content/Help/Philips/Philips%20Signage%20Displays%20RS232%20v1.0%20Help.pdf"
  - https://support.westan.com.au/portal/en-gb/kb/https-support-westan-com-au-portal-kb-philips-tv-and-signage/philips-bdl-bfl-digital-sigange/sicp-protocol-serial-interface-communication-protocol
retrieved_at: 2026-07-25T09:25:54.438Z
last_checked_at: 2026-08-05T08:36:40.471Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:36:40.471Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 spec hex commands match the refined SICP table verbatim, transport values agree with source, source has no extra commands beyond the spec's set. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no query/feedback responses documented in source; no safety/interlock info; no firmware version info; model variants (5588/4678/7988) share one SICP table but individual SKU differences not enumerated."
- "no query responses or unsolicited feedback strings documented in source"
- "no settable parameter discovery documented in source"
- "no unsolicited notification documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "command acknowledgement/response format not documented."
- "byte-level framing (start/stop bytes, checksum algorithm) not documented — payloads appear to include a trailing checksum byte but algorithm not stated."
- "per-SKU differences across 5588/4678/7988 not enumerated."
- "full SICP v1.99 command set likely larger than this excerpt; source is a \"Commonly Used Protocol\" subset."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
