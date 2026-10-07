---
spec_id: admin/sunbritetv-sb-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sunbritetv SB Series Control Spec"
manufacturer: SunBrite
model_family: "SB Series"
aliases: []
compatible_with:
  manufacturers:
    - SunBrite
    - Sunbritetv
  models:
    - "SB Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sunbritetv.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
retrieved_at: 2026-09-26T14:23:19.336Z
last_checked_at: 2026-09-26T14:23:19.336Z
generated_at: 2026-09-26T14:23:19.336Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-09-26T14:23:19.336Z
  matched_actions: 50
  action_count: 50
  confidence: high
  summary: "Independent full one-page primary review:50 request rows, every HEX/ASCII and receipt/execution column match;49 prior IDs retained. Generic legacy same-class model applicability is explicitly caveated; firmware-query contradiction, arrow acknowledgements,NA input and unspecified framing remain unresolved rather than invented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Sunbritetv SB Series Control Spec

## Summary

This draft transcribes the manufacturer’s one-page RS-232 control table, revision 10/07/2016. It documents 50 request rows at 9600 baud, 8 data bits, no parity and 1 stop bit. Each listed request consists of ESC (0x1B) followed by the table’s command byte. The firmware query contains conflicting ASCII and HEX entries.

The catalog family targets SB-3220HD and SB-4610 HD. The source gives model-class response templates B3220AHD-X.XX and B4610AHD-X.XX, but no explicit applicability or firmware-version list. Applicability to the catalog family is inferred from this same-class legacy SunBrite source and must be confirmed for the actual display; this is not a manufacturer-wide compatibility claim. The family identifier is retained; its IR suffix does not establish an IR protocol. No IP control is documented by this source.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED
auth:
  type: UNRESOLVED
command_encoding: Two byte values per HEX row; see firmware_version_query ambiguity.
command_terminator: UNRESOLVED
response_terminator: UNRESOLVED
notes: The table gives command bytes but does not state whether any extra framing/terminator is required. Do not infer no authentication, no flow control, response timing, pacing, retries or error behavior from silence.
```

## Traits
```yaml
- powerable
- routable
- levelable
- queryable
```

## Actions
```yaml
- id: model_class_id_query
  label: Model Class ID
  kind: query
  params: []
  command:
    - 27
    - 63
  command_hex: 1B 3F
  source_ascii: "[ESC]?"
  received_responses:
    - "[B3220AHD-X.XX]"
    - "[B4610AHD-X.XX]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: firmware_version_query
  label: Firmware Version
  kind: query
  params: []
  command:
    - 27
    - 46
  command_hex: 1B 2E
  source_ascii: "[ESC]?"
  received_responses:
    - XXXXX-X.XX
  execution_response_note: The executed-response column says main board followed by version; this is explanatory wording, not an additional literal reply.
  command_status: UNRESOLVED
  notes: "Source contradiction: ASCII column says [ESC]? (bytes 1B 3F), while HEX column says 1B 2E (ESC followed by dot). command reproduces the HEX column only, without claiming it resolves the contradiction. Confirm the correct firmware-query byte before use; 1B 3F is also the Model Class ID query."
- id: power_status_query
  label: Power Status
  kind: query
  params: []
  command:
    - 27
    - 33
  command_hex: 1B 21
  source_ascii: "[ESC]!"
  received_responses:
    - "[PWRON]"
    - "[PWROFF]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
  command:
    - 27
    - 36
  command_hex: 1B 24
  source_ascii: "[ESC]$"
  received_responses:
    - "[$]"
  executed_response: "[PWR]"
  response: "[PWR]"
- id: power_on
  label: Power ON
  kind: action
  params: []
  command:
    - 27
    - 65
  command_hex: 1B 41
  source_ascii: "[ESC]A"
  received_responses:
    - "[A]"
  executed_response: "[PWRON]"
  response: "[PWRON]"
- id: power_off
  label: Power OFF
  kind: action
  params: []
  command:
    - 27
    - 66
  command_hex: 1B 42
  source_ascii: "[ESC]B"
  received_responses:
    - "[B]"
  executed_response: "[PWROFF]"
  response: "[PWROFF]"
- id: select_input_tuner
  label: Input 10 - Tuner
  kind: action
  params: []
  command:
    - 27
    - 67
  command_hex: 1B 43
  source_ascii: "[ESC]C"
  received_responses:
    - "[C]"
  executed_response: "[TN1]"
  response: "[TN1]"
- id: select_input_av
  label: Input 1 - AV
  kind: action
  params: []
  command:
    - 27
    - 68
  command_hex: 1B 44
  source_ascii: "[ESC]D"
  received_responses:
    - "[D]"
  executed_response: "[AV]"
  response: "[AV]"
- id: select_input_na
  label: Input 2 - NA
  kind: action
  params: []
  command:
    - 27
    - 69
  command_hex: 1B 45
  source_ascii: "[ESC]E"
  received_responses:
    - "[E]"
  executed_response: "[N/A]"
  response: "[N/A]"
  notes: "The source labels this input NA and reports [N/A]. Physical availability and intended operation are unresolved; no populated input is inferred."
- id: select_input_hdbaset
  label: Input 3 - HDBaseT
  kind: action
  params: []
  command:
    - 27
    - 70
  command_hex: 1B 46
  source_ascii: "[ESC]F"
  received_responses:
    - "[F]"
  executed_response: "[HDBaseT]"
  response: "[HDBaseT]"
- id: select_input_usb
  label: Input 4 - USB
  kind: action
  params: []
  command:
    - 27
    - 71
  command_hex: 1B 47
  source_ascii: "[ESC]G"
  received_responses:
    - "[G]"
  executed_response: "[USB]"
  response: "[USB]"
- id: select_input_component1
  label: Input 5 - Component1
  kind: action
  params: []
  command:
    - 27
    - 72
  command_hex: 1B 48
  source_ascii: "[ESC]H"
  received_responses:
    - "[H]"
  executed_response: "[Component 1]"
  response: "[Component 1]"
- id: select_input_component2
  label: Input 6 - Component2
  kind: action
  params: []
  command:
    - 27
    - 73
  command_hex: 1B 49
  source_ascii: "[ESC]I"
  received_responses:
    - "[I]"
  executed_response: "[Component2]"
  response: "[Component2]"
- id: select_input_vga
  label: Input 7 -VGA
  kind: action
  params: []
  command:
    - 27
    - 75
  command_hex: 1B 4B
  source_ascii: "[ESC]K"
  received_responses:
    - "[K]"
  executed_response: "[VGA]"
  response: "[VGA]"
- id: select_input_hdmi1
  label: Input 8 - HDMI1
  kind: action
  params: []
  command:
    - 27
    - 74
  command_hex: 1B 4A
  source_ascii: "[ESC]J"
  received_responses:
    - "[J]"
  executed_response: "[HDMI1]"
  response: "[HDMI1]"
- id: select_input_hdmi2
  label: Input 9 - HDMI2
  kind: action
  params: []
  command:
    - 27
    - 76
  command_hex: 1B 4C
  source_ascii: "[ESC]L"
  received_responses:
    - "[L]"
  executed_response: "[HDMI2]"
  response: "[HDMI2]"
- id: mute
  label: Mute
  kind: action
  params: []
  command:
    - 27
    - 88
  command_hex: 1B 58
  source_ascii: "[ESC]X"
  received_responses:
    - "[X]"
  executed_response: "[MUTE]"
  response: "[MUTE]"
- id: volume_up
  label: Vol Up
  kind: action
  params: []
  command:
    - 27
    - 89
  command_hex: 1B 59
  source_ascii: "[ESC]Y"
  received_responses:
    - "[Y]"
  executed_response: "[VOL+]"
  response: "[VOL+]"
- id: volume_down
  label: Vol Down
  kind: action
  params: []
  command:
    - 27
    - 90
  command_hex: 1B 5A
  source_ascii: "[ESC]Z"
  received_responses:
    - "[Z]"
  executed_response: "[VOL-]"
  response: "[VOL-]"
- id: channel_up
  label: Channel Up
  kind: action
  params: []
  command:
    - 27
    - 86
  command_hex: 1B 56
  source_ascii: "[ESC]V"
  received_responses:
    - "[V]"
  executed_response: "[CH+]"
  response: "[CH+]"
- id: channel_down
  label: Channel Down
  kind: action
  params: []
  command:
    - 27
    - 87
  command_hex: 1B 57
  source_ascii: "[ESC]W"
  received_responses:
    - "[W]"
  executed_response: "[CH-]"
  response: "[CH-]"
- id: numeric_1
  label: '1'
  kind: action
  params: []
  command:
    - 27
    - 49
  command_hex: 1B 31
  source_ascii: "[ESC]1"
  received_responses:
    - "[1]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: numeric_2
  label: '2'
  kind: action
  params: []
  command:
    - 27
    - 50
  command_hex: 1B 32
  source_ascii: "[ESC]2"
  received_responses:
    - "[2]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: numeric_3
  label: '3'
  kind: action
  params: []
  command:
    - 27
    - 51
  command_hex: 1B 33
  source_ascii: "[ESC]3"
  received_responses:
    - "[3]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: numeric_4
  label: '4'
  kind: action
  params: []
  command:
    - 27
    - 52
  command_hex: 1B 34
  source_ascii: "[ESC]4"
  received_responses:
    - "[4]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: numeric_5
  label: '5'
  kind: action
  params: []
  command:
    - 27
    - 53
  command_hex: 1B 35
  source_ascii: "[ESC]5"
  received_responses:
    - "[5]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: numeric_6
  label: '6'
  kind: action
  params: []
  command:
    - 27
    - 54
  command_hex: 1B 36
  source_ascii: "[ESC]6"
  received_responses:
    - "[6]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: numeric_7
  label: '7'
  kind: action
  params: []
  command:
    - 27
    - 55
  command_hex: 1B 37
  source_ascii: "[ESC]7"
  received_responses:
    - "[7]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: numeric_8
  label: '8'
  kind: action
  params: []
  command:
    - 27
    - 56
  command_hex: 1B 38
  source_ascii: "[ESC]8"
  received_responses:
    - "[8]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: numeric_9
  label: '9'
  kind: action
  params: []
  command:
    - 27
    - 57
  command_hex: 1B 39
  source_ascii: "[ESC]9"
  received_responses:
    - "[9]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: numeric_0
  label: '0'
  kind: action
  params: []
  command:
    - 27
    - 48
  command_hex: 1B 30
  source_ascii: "[ESC]0"
  received_responses:
    - "[0]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: numeric_minus
  label: '-'
  kind: action
  params: []
  command:
    - 27
    - 45
  command_hex: 1B 2D
  source_ascii: "[ESC]-"
  received_responses:
    - "[-]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: channel_return
  label: Channel Return(Previous Channel)
  kind: action
  params: []
  command:
    - 27
    - 114
  command_hex: 1B 72
  source_ascii: "[ESC]r"
  received_responses:
    - "[r]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: source_toggle
  label: Source Toggle
  kind: action
  params: []
  command:
    - 27
    - 98
  command_hex: 1B 62
  source_ascii: "[ESC]b"
  received_responses:
    - "[b]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: aspect
  label: Aspect
  kind: action
  params: []
  command:
    - 27
    - 97
  command_hex: 1B 61
  source_ascii: "[ESC]a"
  received_responses:
    - "[a]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: enter
  label: Enter
  kind: action
  params: []
  command:
    - 27
    - 101
  command_hex: 1B 65
  source_ascii: "[ESC]e"
  received_responses:
    - "[e]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: info
  label: Info
  kind: action
  params: []
  command:
    - 27
    - 105
  command_hex: 1B 69
  source_ascii: "[ESC]i"
  received_responses:
    - "[i]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: closed_caption
  label: CC
  kind: action
  params: []
  command:
    - 27
    - 99
  command_hex: 1B 63
  source_ascii: "[ESC]c"
  received_responses:
    - "[c]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: sleep
  label: Sleep
  kind: action
  params: []
  command:
    - 27
    - 122
  command_hex: 1B 7A
  source_ascii: "[ESC]z"
  received_responses:
    - "[z]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: picture
  label: Picture
  kind: action
  params: []
  command:
    - 27
    - 112
  command_hex: 1B 70
  source_ascii: "[ESC]p"
  received_responses:
    - "[p]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: sound
  label: Sound
  kind: action
  params: []
  command:
    - 27
    - 115
  command_hex: 1B 73
  source_ascii: "[ESC]s"
  received_responses:
    - "[s]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: menu
  label: Menu
  kind: action
  params: []
  command:
    - 27
    - 109
  command_hex: 1B 6D
  source_ascii: "[ESC]m"
  received_responses:
    - "[m]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: arrow_up
  label: UpArrow
  kind: action
  params: []
  command:
    - 27
    - 94
  command_hex: 1B 5E
  source_ascii: "[ESC]^"
  received_responses:
    - "[^]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: arrow_down
  label: Down Arrow
  kind: action
  params: []
  command:
    - 27
    - 118
  command_hex: 1B 76
  source_ascii: "[ESC]v"
  received_responses:
    - "[v]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: arrow_left
  label: Left Arrow
  kind: action
  params: []
  command:
    - 27
    - 62
  command_hex: 1B 3E
  source_ascii: "[ESC]>"
  received_responses:
    - "[<]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
  notes: 'Source direction/acknowledgement oddity is preserved exactly: the received acknowledgement has the opposite angle bracket from the request. The table does not explain this; do not silently swap request bytes or acknowledgements.'
- id: arrow_right
  label: Right Arrow
  kind: action
  params: []
  command:
    - 27
    - 60
  command_hex: 1B 3C
  source_ascii: "[ESC]<"
  received_responses:
    - "[>]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
  notes: 'Source direction/acknowledgement oddity is preserved exactly: the received acknowledgement has the opposite angle bracket from the request. The table does not explain this; do not silently swap request bytes or acknowledgements.'
- id: picture_mode_personal
  label: Picture Mode 1 - Personal
  kind: action
  params: []
  command:
    - 27
    - 80
  command_hex: 1B 50
  source_ascii: "[ESC]P"
  received_responses:
    - "[P]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: picture_mode_standard
  label: Picture Mode 2 - Standard
  kind: action
  params: []
  command:
    - 27
    - 81
  command_hex: 1B 51
  source_ascii: "[ESC]Q"
  received_responses:
    - "[Q]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: picture_mode_sunbrite_day
  label: Picture Mode 3 - SunBrite Day
  kind: action
  params: []
  command:
    - 27
    - 82
  command_hex: 1B 52
  source_ascii: "[ESC]R"
  received_responses:
    - "[R]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
- id: picture_mode_sunbrite_night
  label: Picture Mode 4 - Sunbrite Night
  kind: action
  params: []
  command:
    - 27
    - 83
  command_hex: 1B 53
  source_ascii: "[ESC]S"
  received_responses:
    - "[S]"
  execution_response_note: The Command Executed Response column is marked na; the separate Command Received Response remains documented.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - "[PWRON]"
    - "[PWROFF]"
  description: Both values appear under Command Received Response for the power-status query; no claim of silence while off.
- id: input_state
  type: enum
  values:
    - "[TN1]"
    - "[AV]"
    - "[N/A]"
    - "[HDBaseT]"
    - "[USB]"
    - "[Component 1]"
    - "[Component2]"
    - "[VGA]"
    - "[HDMI1]"
    - "[HDMI2]"
  description: Execution acknowledgements for individual input requests; no separate current-input query is documented.
- id: firmware_version
  type: string
  response_pattern: XXXXX-X.XX
  description: Main board followed by version; firmware-query ASCII/HEX contradiction remains unresolved.
- id: model_class_id
  type: string
  response_examples:
    - "[B3220AHD-X.XX]"
    - "[B4610AHD-X.XX]"
  description: Published model-class response templates, including version placeholders; these are not an exhaustive list of supported models.
```

## Variables
```yaml
[]
```

## Events
```yaml
[]
```

## Macros
```yaml
[]
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes

Source: https://www.sunbritetv.com/content/RS232-control-codes.pdf (manufacturer download, 1 page, Rev. 10/07/2016). The command_hex and source_ascii fields reproduce the two source columns. Numeric command arrays are raw byte values, not printable decimal text.

received_responses reproduces the Command Received Response column; executed_response reproduces a distinct Command Executed Response when documented. The compatibility response field repeats that execution reply. The literal na in the execution column does not mean that the separate receipt acknowledgement is absent. No acknowledgement ordering, timing, unsolicited notification or error frame is specified. Numeric/menu commands do have their bracketed receipt acknowledgements.

Firmware query: ASCII [ESC]? conflicts with HEX 1B 2E; the draft exposes both without fixing the manufacturer table. Left Arrow transmits 1B 3E ([ESC]>) and acknowledges [<]; Right Arrow transmits 1B 3C ([ESC]<) and acknowledges [>]. Those unusual source values are not exchanged. Input 7/VGA uses K and Input 8/HDMI1 uses J; the source explicitly attributes that ordering to legacy compatibility. Mute is labelled Mute in the source; toggle semantics are not assumed.

The response template XXXXX-X.XX describes main-board/firmware information. It is not a fixed returned string or a supported firmware range. Connector pinout and a model-specific compatibility list are absent. No hardware test was performed. Solis and Veranda 4 are not covered by this legacy protocol draft.

## Provenance

```yaml
source_domains:
  - sunbritetv.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
retrieved_at: 2026-09-26T14:23:19.336Z
last_checked_at: 2026-09-26T14:23:19.336Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:23:19.336Z
matched_actions: 50
action_count: 50
confidence: high
summary: "Independent full one-page primary review:50 request rows, every HEX/ASCII and receipt/execution column match;49 prior IDs retained. Generic legacy same-class model applicability is explicitly caveated; firmware-query contradiction, arrow acknowledgements,NA input and unspecified framing remain unresolved rather than invented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
