---
spec_id: admin/classe-audio-ca-ct-2300
schema_version: ai4av-public-spec-v1
revision: 1
title: "Classe Audio CA/CT-XXXX RS-232 Control Spec"
manufacturer: "Classé"
model_family: CA-2300
aliases: []
compatible_with:
  manufacturers:
    - "Classé"
    - "Classe Audio"
  models:
    - CA-2300
    - CT-2300
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.classeaudio.com
  - web.archive.org
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_Delta_Amps_RS232_Protocol.pdf
  - "https://web.archive.org/web/2010id_/http://classeaudio.com/downloads/Download.htm?Path=RS_232_CODES/Class%E9_RS232/CA-XX00_RS232_V1-1&File=Delta%20Amp%20Serial%20Commands%20PUBLIC%20V1_1.pdf"
  - "https://web.archive.org/web/20101103044932/http://classeaudio.com/downloads/Downloads.htm?Path=/RS_232_CODES/Class%E9_RS232/CA-XX00_RS232_V1-1"
  - https://support.classeaudio.com/files/documents/owners_manual/delta_2/CLASSE_CA_CT-2300_Manual_v1.4_en.pdf
  - https://support.classeaudio.com/documents.html
retrieved_at: 2026-06-13T20:58:20.828Z
last_checked_at: 2026-06-14T16:13:38.878Z
generated_at: 2026-06-14T16:13:38.878Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source covers full CA/CT-XXXX family; per-model feature matrix (e.g. number of channels, which inputs are Balanced vs Single Ended) is not itemized"
  - "source notes \"only available when AMP is ON\" - applicability not enforced by command itself"
  - "source notes \"only available when AMP is OFF\""
  - "source notes \"only available when AMP is OFF\"; channel range per model not stated"
  - "structured form not defined in source; the snapshot begins"
  - "PW? not in source - only PWR / PW0 / PW1 listed. Status must be"
  - "no multi-step sequences described in source"
  - "source mentions \"A fault prevents power up\" as a possible PW1"
  - "command availability windows (ON-only vs OFF-only) are noted in source but not enforced in protocol — implementer must gate at app layer"
verification:
  verdict: verified
  checked_at: 2026-06-14T16:13:38.878Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions matched literally in source with complete transport parameter verification. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-13
---

# Classe Audio CA/CT-XXXX RS-232 Control Spec

## Summary
RS-232 control protocol for Classe Audio Delta and CT series amplifiers, covering the CA-2300 and CT-2300 models. Source document titles the protocol "DELTA & CT AMPLIFIER (CA/CT-XXXX) RS232 Commands" and lists a small command set for power, mute, dim, status snapshot, factory data, amp-number, and per-channel input selection.

<!-- UNRESOLVED: source covers full CA/CT-XXXX family; per-model feature matrix (e.g. number of channels, which inputs are Balanced vs Single Ended) is not itemized -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: hardware
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: PWR/PW0/PW1 commands present
- routable        # inferred: INPx=B / INPx=S input-select commands present
- queryable       # inferred: chk and fac snapshot/factory commands present
```

## Actions
```yaml
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "PWR"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "PW0"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "PW1"
  params: []

- id: dim_cycle
  label: Cycle Front Panel Dimmer
  kind: action
  command: "DIM"
  params: []

- id: status_snapshot
  label: Heatsink / AC Status Snapshot
  kind: query
  command: "chk"
  params: []

- id: factory_data
  label: Factory / Version Data
  kind: query
  command: "fac"
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "MUT"
  params: []
  # UNRESOLVED: source notes "only available when AMP is ON" - applicability not enforced by command itself

- id: mute_off
  label: Mute Off
  kind: action
  command: "MU0"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "MU1"
  params: []

- id: set_amp_number
  label: Set Logical Amp Number
  kind: action
  command: "amp={n}"
  params:
    - name: n
      type: integer
      description: Logical amp number 1..15, used for power-up delay ordering
  # UNRESOLVED: source notes "only available when AMP is OFF"

- id: input_select_balanced
  label: Input Select Balanced
  kind: action
  command: "INPx=B"
  params:
    - name: x
      type: integer
      description: Channel number (model-dependent)
  # UNRESOLVED: source notes "only available when AMP is OFF"; channel range per model not stated

- id: input_select_single_ended
  label: Input Select Single Ended
  kind: action
  command: "INPx=S"
  params:
    - name: x
      type: integer
      description: Channel number (model-dependent)
  # UNRESOLVED: source notes "only available when AMP is OFF"; channel range per model not stated
```

## Feedbacks
```yaml
# Verbatim reply strings from source. Each `reply` is a literal example the
# amplifier may send; multiple alternatives are listed as the source presents
# them.
- id: power_off_reply
  type: enum
  values:
    - "Amplifier now OFF."
    - "Amp already off."

- id: power_on_reply
  type: enum
  values:
    - "Power up in process. Amplifier now ON."
    - "Amp already on."
    - "A fault prevents power up."

- id: status_snapshot_reply
  type: string
  # UNRESOLVED: structured form not defined in source; the snapshot begins
  # with "This Amplifier is OFF" when amp is off, otherwise emits one line
  # per heatsink followed by AC module parameters. Examples in source.

- id: factory_data_reply
  type: string
  # Example from source:
  # "D-AMP Ver: 1.0 Copyright (c) 2003 Classe Audio Sr No:1590053
  #  Model: CA2200, Amp#  1 OK AC Control: 2E,
  #  Heatsink 1: L1, Heatsink 2: L1,"
  # The trailing "Heatsink N: Ln" line is omitted when amp is on.

- id: mute_off_reply
  type: enum
  values:
    - "Mute off."
    - "Mute already off."

- id: mute_on_reply
  type: enum
  values:
    - "Mute on."
    - "Mute already on."
```

## Variables
```yaml
# Source does not document a discrete "set variable" command separate from the
# action set above. amp={n} is encoded as an action; INPx=B/S is encoded as an
# action. No further settable scalar parameters described.
```

## Events
```yaml
# Source describes no unsolicited notifications. Status requires polling via
# chk / fac / PW?.
# UNRESOLVED: PW? not in source - only PWR / PW0 / PW1 listed. Status must be
# inferred by parsing PWR/PW0/PW1 replies or by polling fac/chk.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions "A fault prevents power up" as a possible PW1
# reply but defines no fault-recovery or interlock procedure.
```

## Notes
- Source document is titled "DELTA & CT AMPLIFIER (CA/CT-XXXX) RS232 Commands" — covers both Delta-series (CA-XXXX) and CT-series (CT-XXXX) amplifiers in a single command table. This spec is filed under the CA-2300 / CT-2300 family; the same command set is presumed to apply across the family, but per-model behavior (number of channels, presence of CT-M300/CT-M600 preamp tuners) is not itemized in the source.
- The `chk` (status snapshot) and `fac` (factory data) replies vary by model. Source example uses a 5-channel amp and shows a CA-2200 model string; CT-2300 replies may differ in channel count and model field.
- Hardware (RTS/CTS) flow control is required per source. Cabling must support this; null-modem is not implied.
- The source mixes `MUT`/`MU0`/`MU1` (mute) and `PWR`/`PW0`/`PW1` (power) into a single `chk`-style response family; implementers should treat `PWR` and `MUT` as toggle actions whose resulting state is observable only via the next reply, not via a query response.
- Source PDF located at `docs/pdfs/classe_ca_ct_2300_serial.refined.md` (refined excerpt of the original `Delta Amp Serial Commands PUBLIC V1_1.pdf`).
<!-- UNRESOLVED: command availability windows (ON-only vs OFF-only) are noted in source but not enforced in protocol — implementer must gate at app layer -->
```

Self-check:
- No voltages/currents invented
- Port N/A (serial-only) — omitted, correct
- Baud 9600 from source
- status=draft, confidence=low
- entity_id filled
- UNRESOLVED markers on gaps

Ready for ingest.

## Provenance

```yaml
source_domains:
  - support.classeaudio.com
  - web.archive.org
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_Delta_Amps_RS232_Protocol.pdf
  - "https://web.archive.org/web/2010id_/http://classeaudio.com/downloads/Download.htm?Path=RS_232_CODES/Class%E9_RS232/CA-XX00_RS232_V1-1&File=Delta%20Amp%20Serial%20Commands%20PUBLIC%20V1_1.pdf"
  - "https://web.archive.org/web/20101103044932/http://classeaudio.com/downloads/Downloads.htm?Path=/RS_232_CODES/Class%E9_RS232/CA-XX00_RS232_V1-1"
  - https://support.classeaudio.com/files/documents/owners_manual/delta_2/CLASSE_CA_CT-2300_Manual_v1.4_en.pdf
  - https://support.classeaudio.com/documents.html
retrieved_at: 2026-06-13T20:58:20.828Z
last_checked_at: 2026-06-14T16:13:38.878Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-14T16:13:38.878Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions matched literally in source with complete transport parameter verification. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source covers full CA/CT-XXXX family; per-model feature matrix (e.g. number of channels, which inputs are Balanced vs Single Ended) is not itemized"
- "source notes \"only available when AMP is ON\" - applicability not enforced by command itself"
- "source notes \"only available when AMP is OFF\""
- "source notes \"only available when AMP is OFF\"; channel range per model not stated"
- "structured form not defined in source; the snapshot begins"
- "PW? not in source - only PWR / PW0 / PW1 listed. Status must be"
- "no multi-step sequences described in source"
- "source mentions \"A fault prevents power up\" as a possible PW1"
- "command availability windows (ON-only vs OFF-only) are noted in source but not enforced in protocol — implementer must gate at app layer"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
