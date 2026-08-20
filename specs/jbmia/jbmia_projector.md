---
spec_id: admin/jbmia-projector
schema_version: ai4av-public-spec-v1
revision: 1
title: "JBMIA PJLink Class 1 Projector/Display Control Spec"
manufacturer: JBMIA
model_family: "JBMIA PJLink Class 1 compatible Projector/Display"
aliases: []
compatible_with:
  manufacturers:
    - JBMIA
  models:
    - "JBMIA PJLink Class 1 compatible Projector/Display"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pjlink.jbmia.or.jp
source_urls:
  - https://pjlink.jbmia.or.jp/english/data/5-1_PJLink_eng_20131210.pdf
retrieved_at: 2026-07-14T07:40:07.800Z
last_checked_at: 2026-08-19T09:25:37.356Z
generated_at: 2026-08-19T09:25:37.356Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "spec does not bind to one physical model; it is a class-level protocol definition. compatible_with.models lists a generic PJLink Class 1 device because the source defines the protocol rather than a single product."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:25:37.356Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions map to PJLink Class 1 source commands (POWR/INPT/AVMT set+query, ERST/LAMP/INST/NAME/INF1/INF2/INFO/CLSS queries); transport port 4352 and MD5 auth verified. (1 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-15
---

# JBMIA PJLink Class 1 Projector/Display Control Spec

## Summary
This spec covers the PJLink Class 1 control protocol published by JBMIA (JAPAN BUSINESS MACHINE AND INFORMATION SYSTEM INDUSTRIES ASSOCIATION), version 1.04 (2013-12-10). PJLink is a TCP/IP-based ASCII command protocol that allows a CONTROLLER client to manage PJLink-compatible Projectors and Displays. Class 1 covers fundamental control: power, input switching, mute, error/lamp status, and device information queries.

<!-- UNRESOLVED: spec does not bind to one physical model; it is a class-level protocol definition. compatible_with.models lists a generic PJLink Class 1 device because the source defines the protocol rather than a single product. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 4352
auth:
  type: optional
  description: MD5 digest challenge-response; Projector/Display may signal security nullification with `PJLINK 0` so authentication can be skipped. CONTROLLER must handle both paths.
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On (lamp-on)
  kind: action
  command: "%1POWR 1\r"
  params: []

- id: power_off
  label: Power Off (standby)
  kind: action
  command: "%1POWR 0\r"
  params: []

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "%1POWR ?\r"
  params: []

- id: input_switch_rgb
  label: Switch Input to RGB
  kind: action
  command: "%1INPT 11\r"
  params: []

- id: input_switch_video
  label: Switch Input to VIDEO
  kind: action
  command: "%1INPT 21\r"
  params: []

- id: input_switch_digital
  label: Switch Input to DIGITAL
  kind: action
  command: "%1INPT 31\r"
  params: []

- id: input_switch_storage
  label: Switch Input to STORAGE
  kind: action
  command: "%1INPT 41\r"
  params: []

- id: input_switch_network
  label: Switch Input to NETWORK
  kind: action
  command: "%1INPT 51\r"
  params: []

- id: input_switch_rgb_n
  label: Switch Input to RGB (sub-source 1-9)
  kind: action
  command: "%1INPT 1{n}\r"
  params:
    - name: n
      type: integer
      description: RGB sub-source number 1-9

- id: input_switch_video_n
  label: Switch Input to VIDEO (sub-source 1-9)
  kind: action
  command: "%1INPT 2{n}\r"
  params:
    - name: n
      type: integer
      description: VIDEO sub-source number 1-9

- id: input_switch_digital_n
  label: Switch Input to DIGITAL (sub-source 1-9)
  kind: action
  command: "%1INPT 3{n}\r"
  params:
    - name: n
      type: integer
      description: DIGITAL sub-source number 1-9

- id: input_switch_storage_n
  label: Switch Input to STORAGE (sub-source 1-9)
  kind: action
  command: "%1INPT 4{n}\r"
  params:
    - name: n
      type: integer
      description: STORAGE sub-source number 1-9

- id: input_switch_network_n
  label: Switch Input to NETWORK (sub-source 1-9)
  kind: action
  command: "%1INPT 5{n}\r"
  params:
    - name: n
      type: integer
      description: NETWORK sub-source number 1-9

- id: input_switch_query
  label: Input Switch Query
  kind: query
  command: "%1INPT ?\r"
  params: []

- id: mute_video_on
  label: Video Mute On
  kind: action
  command: "%1AVMT 11\r"
  params: []

- id: mute_video_off
  label: Video Mute Off
  kind: action
  command: "%1AVMT 10\r"
  params: []

- id: mute_audio_on
  label: Audio Mute On
  kind: action
  command: "%1AVMT 21\r"
  params: []

- id: mute_audio_off
  label: Audio Mute Off
  kind: action
  command: "%1AVMT 20\r"
  params: []

- id: mute_av_on
  label: Video and Audio Mute On
  kind: action
  command: "%1AVMT 31\r"
  params: []

- id: mute_av_off
  label: Video and Audio Mute Off
  kind: action
  command: "%1AVMT 30\r"
  params: []

- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "%1AVMT ?\r"
  params: []

- id: error_status_query
  label: Error Status Query
  kind: query
  command: "%1ERST ?\r"
  params: []

- id: lamp_query
  label: Lamp Number / Lighting Hour Query
  kind: query
  command: "%1LAMP ?\r"
  params: []

- id: input_toggling_list_query
  label: Input Toggling List Query
  kind: query
  command: "%1INST ?\r"
  params: []

- id: projector_name_query
  label: Projector/Display Name Query
  kind: query
  command: "%1NAME ?\r"
  params: []

- id: manufacturer_name_query
  label: Manufacturer Name Information Query
  kind: query
  command: "%1INF1 ?\r"
  params: []

- id: product_name_query
  label: Product Name Information Query
  kind: query
  command: "%1INF2 ?\r"
  params: []

- id: other_information_query
  label: Other Information Query
  kind: query
  command: "%1INFO ?\r"
  params: []

- id: class_information_query
  label: Class Information Query
  kind: query
  command: "%1CLSS ?\r"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
  description: POWR response. 0 = power-off (standby), 1 = power-on (lamp-on), 2 = cooling, 3 = warm-up.

- id: input_source
  type: string
  description: INPT response. Two-digit ASCII; first digit (1-5) is the input category (RGB/VIDEO/DIGITAL/STORAGE/NETWORK), second digit (1-9) is the sub-source.

- id: mute_state
  type: enum
  values:
    - "11"
    - "10"
    - "21"
    - "20"
    - "31"
    - "30"
  description: AVMT response. 11 = video mute on, 10 = video mute off, 21 = audio mute on, 20 = audio mute off, 31 = AV mute on, 30 = AV mute off.

- id: error_status
  type: string
  description: ERST response. Six-digit status; each digit (0-2) reports Fan, Lamp, Temperature, Cover open, Filter, Other respectively. 0 = no error or no detector, 1 = warning, 2 = error.

- id: lamp_status
  type: string
  description: LAMP response. Repeating pairs of `hours on` then `lamp on/off flag` (0 or 1). Maximum 8 lamps, total parameter length 65 bytes.

- id: input_toggling_list
  type: string
  description: INST response. Space-separated list of input numbers (11-59), up to 50 entries / 95 bytes.

- id: projector_name
  type: string
  description: NAME response. UTF-8 string, 0-64 characters.

- id: manufacturer_name
  type: string
  description: INF1 response. ASCII printable (0x20-0x7e), 0-32 characters.

- id: product_name
  type: string
  description: INF2 response. ASCII printable (0x20-0x7e), 0-32 characters.

- id: other_information
  type: string
  description: INFO response. ASCII printable (0x20-0x7e), 0-32 characters.

- id: pjlink_class
  type: enum
  values:
    - "1"
  description: CLSS response. Class 1-compatible Projector/Display returns "1".

- id: set_response_code
  type: enum
  values:
    - OK
    - ERR1
    - ERR2
    - ERR3
    - ERR4
  description: Response to set commands. OK = success, ERR1 = undefined command, ERR2 = out of parameter, ERR3 = unavailable time, ERR4 = Projector/Display failure.

- id: get_response_code
  type: enum
  values:
    - ERR1
    - ERR3
    - ERR4
  description: Response codes returned by get commands on failure (no OK here; success carries the requested value instead).
```

## Variables
```yaml
- name: authentication_random
  type: string
  description: 4-byte integer rendered as 8 ASCII lowercase hex chars (e.g. `498e4a67`). Issued by Projector/Display in `PJLINK 1 <random>` greeting.

- name: authentication_digest
  type: string
  description: 32-byte ASCII hex MD5 digest of `random + password`, sent prefixed to the first command when security is active.

- name: security_mode_signal
  type: string
  description: Projector/Display greeting `PJLINK 0` indicates security nullification (no authentication required). `PJLINK 1 <random>` indicates authentication required.
```

## Events
```yaml
- id: pjlink_greeting
  description: First message sent by the Projector/Display on TCP connect. Format `PJLINK 1 <8-hex-chars>\r` (security active) or `PJLINK 0\r` (security off). Use to determine whether MD5 authentication is required before the first command.
```

## Macros
```yaml
- id: authenticated_first_command
  description: When the Projector/Display greeting carries `PJLINK 1 <random>`, the CONTROLLER must prepend the MD5 digest of `<random><password>` to the first command line. Subsequent commands on the same TCP session may omit the digest.
  steps:
    - receive: PJLINK greeting
    - branch: greeting payload
    - branch_when: "PJLINK 1 <random>"
      action: compute md5( random + password )
    - branch_then: send first command prefixed with digest
    - branch_when: "PJLINK 0"
      action: send first command without digest
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Commands sent during power-on warm-up (first ~10 seconds after standby → projection transition) are not guaranteed.
  - description: Commands sent during signal/input switching are not guaranteed.
  - description: Commands sent during the interval between Projector/Display receiving a command and issuing its response are not guaranteed.
  - description: Commands sent during the interval between lamp cooling completion and standby transition are not guaranteed.
  - description: Projector/Display forces TCP disconnect 30 seconds after last response if no further command is received. CONTROLLER must terminate cleanly after work is complete.
  - description: ERR3 (unavailable time) responses indicate the Projector/Display cannot accept the command right now - retry only after the relevant transition completes.
```

## Notes
All PJLink Class 1 command lines and responses begin with `%1` (percent + ASCII "1") and terminate with `\r` (0x0d). The 4-byte command body is case-insensitive. The Projector/Display answers within 2 seconds of receiving a valid command; commands that violate format elicit no response. Simultaneous connections from two or more controllers are permitted, but only the last received command is guaranteed effective. Class 1 is the fundamental control set; higher PJLink classes extend it. The password example used in the spec (`JBMIAProjectorLink`) is illustrative, not a default credential for any specific device.

## Provenance

```yaml
source_domains:
  - pjlink.jbmia.or.jp
source_urls:
  - https://pjlink.jbmia.or.jp/english/data/5-1_PJLink_eng_20131210.pdf
retrieved_at: 2026-07-14T07:40:07.800Z
last_checked_at: 2026-08-19T09:25:37.356Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:25:37.356Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions map to PJLink Class 1 source commands (POWR/INPT/AVMT set+query, ERST/LAMP/INST/NAME/INF1/INF2/INFO/CLSS queries); transport port 4352 and MD5 auth verified. (1 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "spec does not bind to one physical model; it is a class-level protocol definition. compatible_with.models lists a generic PJLink Class 1 device because the source defines the protocol rather than a single product."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
