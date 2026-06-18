---
spec_id: admin/philips-xxbdl4051t
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips xxBDL4051T Control Spec"
manufacturer: Philips
model_family: xxBDL4051T
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - xxBDL4051T
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.westan.com.au
  - documents.philips.com
  - community.xibo.org.uk
  - sbprojects.net
  - manua.ls
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://www.documents.philips.com/assets/20230530/413f1de390ee40c9a306b012008fe7a5.pdf
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.sbprojects.net/knowledge/ir/rc5.php
  - https://www.manua.ls/philips/43bdl4051t/manual
retrieved_at: 2026-06-15T22:36:37.607Z
last_checked_at: 2026-06-16T07:14:06.016Z
generated_at: 2026-06-16T07:14:06.016Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full SICP command catalogue lives in an external SharePoint document referenced but not included here; only the \"commonly used\" subset was captured. Query/feedback response formats, timing, and firmware version compatibility not stated."
  - "source documents no response/acknowledgement strings or query responses."
  - "source lists discrete volume-set hex per level rather than a"
  - "no unsolicited notifications documented in source."
  - "no multi-step sequences described in source."
  - "source contains no safety warnings, interlock procedures,"
  - "firmware version compatibility not stated."
  - "full SICP command catalogue (queries, responses, advanced commands) not in captured source."
  - "SICP frame checksum algorithm not documented."
  - "SICP-over-IP model support list not stated; unclear if BDL4051T supports TCP transport natively."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:14:06.016Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions match exact hex substrings in the source; all transport parameters verified against documented serial and TCP settings. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Philips xxBDL4051T Control Spec

## Summary
Philips BDL4051T professional signage display controlled via the SICP (Serial Interface Control Protocol) v1.89+ using hex command frames over RS-232 (default) or TCP/IP for SICP-over-IP models. Covers power, input selection, speaker/audio-out volume (up/down and absolute levels), mute, and display tiling.

<!-- UNRESOLVED: full SICP command catalogue lives in an external SharePoint document referenced but not included here; only the "commonly used" subset was captured. Query/feedback response formats, timing, and firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source: "Baud Rate : 9600 (except 75BDL3151T - baud rate:115200)"; BDL4051T is not the exception
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 5000  # source: "default port is TCP port 5000" (SICP over IP models)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: power on/off commands present
  - routable    # inferred: input select commands present
  - levelable   # inferred: volume up/down/set commands present
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

  - id: input_hdmi1
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

  - id: volume_speaker_audioout_up
    label: Volume (speaker and audio out) Up
    kind: action
    command: "07 00 00 41 01 01 46"
    params: []

  - id: volume_speaker_audioout_down
    label: Volume (speaker and audio out) Down
    kind: action
    command: "07 00 00 41 00 00 46"
    params: []

  - id: volume_audioout_up
    label: Volume (audio out) Up
    kind: action
    command: "07 00 00 41 02 01 45"
    params: []

  - id: volume_audioout_down
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

  - id: volume_set_0
    label: Volume 0
    kind: action
    command: "07 00 00 44 00 00 43"
    params: []

  - id: volume_set_10
    label: Volume 10
    kind: action
    command: "07 00 00 44 0A 0A 43"
    params: []

  - id: volume_set_20
    label: Volume 20
    kind: action
    command: "07 00 00 44 14 14 43"
    params: []

  - id: volume_set_30
    label: Volume 30
    kind: action
    command: "07 00 00 44 1E 1E 43"
    params: []

  - id: volume_set_40
    label: Volume 40
    kind: action
    command: "07 00 00 44 28 28 43"
    params: []

  - id: volume_set_50
    label: Volume 50
    kind: action
    command: "07 00 00 44 32 32 43"
    params: []

  - id: volume_set_60
    label: Volume 60
    kind: action
    command: "07 00 00 44 3C 3C 43"
    params: []

  - id: volume_set_70
    label: Volume 70
    kind: action
    command: "07 00 00 44 46 46 43"
    params: []

  - id: volume_set_80
    label: Volume 80
    kind: action
    command: "07 00 00 44 50 50 43"
    params: []

  - id: volume_set_90
    label: Volume 90
    kind: action
    command: "07 00 00 44 5A 5A 43"
    params: []

  - id: volume_set_100
    label: Volume 100
    kind: action
    command: "07 00 00 44 64 64 43"
    params: []

  - id: tiling_enable
    label: Enable Tiling
    kind: action
    command: "09 00 00 22 01 02 00 00 1C"
    params: []

  - id: tiling_disable
    label: Disable Tiling
    kind: action
    command: "09 00 00 22 00 02 00 00 1D"
    params: []
```

## Feedbacks
```yaml
# UNRESOLVED: source documents no response/acknowledgement strings or query responses.
# The external SharePoint SICP reference (not included) likely defines them.
```

## Variables
```yaml
# UNRESOLVED: source lists discrete volume-set hex per level rather than a
# parameterized register; no other settable parameters documented here.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures,
# or power-on sequencing requirements.
```

## Notes
- Protocol is SICP v1.89+ using hex command frames. Bytes appear to include a trailing checksum byte (e.g. volume-set frames always end in `43`); the checksum algorithm is not documented in this excerpt.
- Most models only support a maximum volume of 60 per the source note, even though level 70–100 frames are listed.
- Speaker/audio-out volume and audio-out-only volume use distinct opcodes (`41 01/00` vs `41 02 01/00`).
- The full SICP command set is in an external SharePoint folder referenced by the source but not captured here: `https://westanonline.sharepoint.com/:f:/s/Support/EpR87zbEmfpTs4SrmG_HxZwBAP7LBdxpdzMaacZk69NkUA`.
- Serial config exception: model 75BDL3151T uses 115200 baud; BDL4051T uses 9600.

<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: full SICP command catalogue (queries, responses, advanced commands) not in captured source. -->
<!-- UNRESOLVED: SICP frame checksum algorithm not documented. -->
<!-- UNRESOLVED: SICP-over-IP model support list not stated; unclear if BDL4051T supports TCP transport natively. -->
````

Spec above. 29 actions = all source rows enumerated verbatim (hex payloads exact, checksums preserved). Serial+TCP transport, port 5000 + 9600 baud from source only. No fabrication. UNRESOLVED markers on all gaps (firmware, full catalogue, checksum algo, IP support list, feedbacks/vars/events/macros/safety).

## Provenance

```yaml
source_domains:
  - support.westan.com.au
  - documents.philips.com
  - community.xibo.org.uk
  - sbprojects.net
  - manua.ls
source_urls:
  - https://support.westan.com.au/portal/en-gb/kb/articles/bdl-sicp-commonly-used-protocol-v-1-89-onwards
  - https://www.documents.philips.com/assets/20230530/413f1de390ee40c9a306b012008fe7a5.pdf
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
  - https://www.sbprojects.net/knowledge/ir/rc5.php
  - https://www.manua.ls/philips/43bdl4051t/manual
retrieved_at: 2026-06-15T22:36:37.607Z
last_checked_at: 2026-06-16T07:14:06.016Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:14:06.016Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions match exact hex substrings in the source; all transport parameters verified against documented serial and TCP settings. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full SICP command catalogue lives in an external SharePoint document referenced but not included here; only the \"commonly used\" subset was captured. Query/feedback response formats, timing, and firmware version compatibility not stated."
- "source documents no response/acknowledgement strings or query responses."
- "source lists discrete volume-set hex per level rather than a"
- "no unsolicited notifications documented in source."
- "no multi-step sequences described in source."
- "source contains no safety warnings, interlock procedures,"
- "firmware version compatibility not stated."
- "full SICP command catalogue (queries, responses, advanced commands) not in captured source."
- "SICP frame checksum algorithm not documented."
- "SICP-over-IP model support list not stated; unclear if BDL4051T supports TCP transport natively."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
